import moment from "moment";

import { ColumnDef } from "@tanstack/react-table";
import { Icon } from "Components/icon/Icon";
import { ITableConfig } from "Components/datatable/IDatatable";
import { IAction, IBaseFormGroupField } from "Components/field/IForm";
import { useEffect, useState } from "react";
import {
  ConfirmDialogContext,
  IConfirmDialogContent,
} from "Services/contexts/ConfirmDialogContext";
import { useDialogContext } from "Services/contexts/DialogContext";
import { DynamicObject } from "Utils/globalInterface";
import {
  url,
  getAllRolesKey,
  addRole,
  deleteRole,
  retrieveRole,
  updateRole,
  getAllRoles,
} from "./RoleActions";
import { IRoleInput } from "./IRole";
import { DataTable } from "Components/datatable/Table";
import { ConfirmDialog } from "Components/modal/confirm/Confirm";
import { Dialog } from "Components/modal/dialog/Dialog";
import { FormGroup } from "Components/field/FormGroup";
import { FormContext, IForm } from "Services/contexts/FormContext";
import {
  getAllPermissions,
  getAllPermissionsKey,
} from "../permission/PermissionActions";
import { useQueries } from "@tanstack/react-query";
import { getAllModules, getAllModulesKey } from "../module/ModuleActions";
import { roleSchema } from "./RoleSchema";

const columnDef: ColumnDef<DynamicObject, string>[] = [
  {
    accessorKey: "name", // key
    header: "Name", // header name
    cell: (info: { getValue: () => string }) => info.getValue(),
    enableSorting: true,
    sortUndefined: -1,
    sortDescFirst: false,
  },
  {
    accessorKey: "active",
    header: "Active",
    cell: (info: { getValue: () => string }) => {
      const active = !!info.getValue() === true;
      return (
        <div
          className={`badge min-w-[50px] xs:min-w-[150px] justify-start ${
            active ? "badge-success" : "badge-soft badge-error"
          }`}
        >
          {active ? (
            <>
              <Icon icon="toggle-right" classNames="" />
              <span className="md:block hidden text-nowrap">Active</span>
            </>
          ) : (
            <>
              <Icon icon="toggle-left" classNames="text-nowrap" />
              <span className="md:block hidden text-nowrap">Not Active</span>
            </>
          )}
        </div>
      );
    },
    enableSorting: true,
    sortUndefined: -1,
    sortDescFirst: false,
    enableGlobalFilter: false,
  },
  {
    accessorKey: "createdAt",
    header: "Date Created",
    cell: (info: { getValue: () => string }) =>
      moment(info.getValue()).format("MMM DD, YYYY"),
    enableSorting: true,
    sortUndefined: -1,
    sortDescFirst: false,
    enableGlobalFilter: false,
  },
  {
    accessorKey: "updatedAt",
    header: "Last Update",
    cell: (info: { getValue: () => string }) =>
      moment(info.getValue()).format("MMM DD, YYYY"),
    enableSorting: true,
    sortUndefined: -1,
    sortDescFirst: false,
    enableGlobalFilter: false,
  },
];

const config: ITableConfig = {
  module: "role",
  serverSide: false,
  permissions: {
    search: {
      isAllowed: true,
      placeholder: "Search",
    },
    add: {
      isAllowed: true,
      placeholder: "Add role",
      popover: "Add new role",
    },
    delete: {
      isAllowed: true,
      placeholder: "Delete",
      popover: "Delete this role?",
    },
    update: {
      isAllowed: true,
      placeholder: "Edit",
      popover: "Update this role?",
    },
  },
};

const formFieldsDefaultConfig: IBaseFormGroupField[] = [
  {
    name: "active",
    className: "flex flex-row w-full items-center",
    label: {
      className: "w-full justify-end",
      value: "Is Actve?",
    },
    field: {
      type: "checkbox",
      className: "flex dirc checkbox",
      placeholder: "Toggle this to turn on/off this role",
    },
    error: {
      className: "float-right",
    },
  },
  {
    name: "name",
    className: "my-2",
    label: {
      className: "w-full",
      value: "Role name",
    },
    field: {
      type: "text",
      className: "input w-full",
      placeholder: "Role name",
    },
  },
  {
    name: "description",
    className: "my-2",
    label: {
      className: "w-full",
      value: "Description",
    },
    field: {
      type: "textarea",
      className: "input w-full",
      placeholder: "Role description",
    },
  },
  {
    name: "modules",
    className: "mt-5",
    label: {
      className: "w-full",
      value: "Filter permissions below by selecting a module here ",
    },
    field: {
      type: "select",
      options: [],
      className: "input select w-full",
      placeholder: "Select modules",
    },
    includeAll: true,
    excludeDisabledOption: true,
  },
  {
    name: "permissions",
    className: "",
    label: {
      className: "w-1/2 lowercase items-center",
      value: "Select allowed permission for this role",
    },
    field: {
      type: "checklist",
      className: "input",
      checklist: [],
      parent: {
        name: "rolePermission",
        key: "permissionId",
      },
    },
  },
];

const updatePermissionsByModule = (
  permissionsByModule: DynamicObject[],
  moduleId?: string
) =>
  permissionsByModule?.map((permission: DynamicObject) => {
    const module =
      permission.module &&
      typeof permission.module === "object" &&
      "name" in permission.module
        ? (permission.module as DynamicObject)
        : {};

    return {
      key: String(permission.id),
      value: `${permission.action}:${module.name}`,
      isHidden: moduleId !== "all" && module && moduleId !== String(module.id),
      defaultChecked: false,
    };
  }) ?? [];

export const Role = () => {
  const [confirmDialog, setConfirmDialog] = useState<IConfirmDialogContent>({
    open: false,
    module: "Roles",
  });
  const [form, setForm] = useState<IForm>({
    url: url,
    fetchQueryKey: getAllRolesKey,
    action: "create" as IAction, // defaults to create
    onAddFn: (data: DynamicObject) => addRole(data as IRoleInput),
    onUpdateFn: (id: string, data: DynamicObject) =>
      updateRole(id, data as IRoleInput),
    onDeleteFn: (id: string) => deleteRole(id),
    onRetrieveFn: (id: string) => retrieveRole(id),
  });

  const [formFields, setFormFields] = useState(formFieldsDefaultConfig);

  const result = useQueries({
    queries: [
      {
        queryKey: [getAllRolesKey],
        queryFn: () => getAllRoles(),
      },
      {
        queryKey: [getAllModulesKey],
        queryFn: () => getAllModules(),
      },
      {
        queryKey: [getAllPermissionsKey],
        queryFn: () => getAllPermissions(),
      },
    ],
  });

  useEffect(() => {
    setFormFields((prev) => {
      return prev.map((p) => {
        if (p.name === "modules" && p.field.type === "select") {
          return {
            ...p,
            field: {
              ...p.field,
              options:
                result[1]?.data?.data?.map((module: DynamicObject) => ({
                  key: String(module.id),
                  value: module.name,
                })) ?? [],
              onChange: (e: React.ChangeEvent<HTMLSelectElement>) => {
                setFormFields((prev) => {
                  return prev.map((p) => {
                    if (p.name !== "permission" && p.field.type !== "checklist")
                      return p;
                    return {
                      ...p,
                      field: {
                        ...p.field,
                        checklist: result[2]?.data?.data
                          ? updatePermissionsByModule(
                              result[2].data.data,
                              e.target.value
                            )
                          : [],
                      },
                    };
                  });
                });
              },
            },
          };
        } else if (p.name === "permissions") {
          return {
            ...p,
            field: {
              ...p.field,
              checklist: result[2]?.data?.data
                ? updatePermissionsByModule(result[2].data.data, "all")
                : [],
            },
          };
        } else {
          return p;
        }
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result[1].data, result[2].data]);

  const { dialog } = useDialogContext();
  const [isFetching, isLoading] = result
    .map((res) => [res.isFetching, res.isLoading])
    .flat();

  return (
    <>
      <FormContext.Provider value={{ form, setForm }}>
        <ConfirmDialogContext.Provider
          value={{ confirmDialog, setConfirmDialog }}
        >
          <ConfirmDialog />
          <Dialog>
            <FormGroup
              formFields={formFields}
              schema={roleSchema}
              moduleName="Role"
              data={dialog.data}
              defaultValues={{
                modules: "all",
                permissions: (() => {
                  const permissionsField = formFields.find(
                    (f) => f.name === "permissions"
                  )?.field;
                  if (
                    permissionsField &&
                    "checklist" in permissionsField &&
                    Array.isArray(permissionsField.checklist)
                  ) {
                    return permissionsField.checklist.map((c) => ({
                      permissionId: c.key,
                      defaultChecked: c.defaultChecked,
                    }));
                  }
                  return [];
                })(),
              }}
            />
          </Dialog>

          <DataTable
            data={result[0].data?.data ?? []}
            columnDef={columnDef}
            config={config}
            isFetching={isFetching}
            isLoading={isLoading}
          />
        </ConfirmDialogContext.Provider>
      </FormContext.Provider>
    </>
  );
};
