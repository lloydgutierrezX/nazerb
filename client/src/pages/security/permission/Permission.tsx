import { ColumnDef } from "@tanstack/react-table";
import { ITableConfig } from "Components/datatable/IDatatable";
import { IAction, IBaseFormGroupField } from "Components/field/IForm";
import { Icon } from "Components/icon/Icon";
import moment from "moment";
import {
  addPermission,
  deletePermission,
  getAllPermissions,
  getAllPermissionsKey,
  retrievePermission,
  updatePermission,
  url,
} from "./PermissionActions";
import { useDialogContext } from "Services/contexts/DialogContext";
import { useEffect, useState } from "react";
import {
  ConfirmDialogContext,
  IConfirmDialogContent,
} from "Services/contexts/ConfirmDialogContext";
import { DynamicObject } from "Utils/globalInterface";
import { IPermissionInput } from "./IPermission";
import { DataTable } from "Components/datatable/Table";
import { ConfirmDialog } from "Components/modal/confirm/Confirm";
import { Dialog } from "Components/modal/dialog/Dialog";
import { FormGroup } from "Components/field/FormGroup";
import { FormContext, IForm } from "Services/contexts/FormContext";
import { IModuleResponse } from "../module/IModule";
import { getAllModules, getAllModulesKey } from "../module/ModuleActions";
import { permissionSchema } from "./PermissionSchema";
import { useQueries } from "@tanstack/react-query";

// ColumnsDef: for react-table column display
const columnDef: ColumnDef<DynamicObject, string>[] = [
  {
    accessorKey: "action", // key
    header: "Action", // header name
    cell: (cell) => {
      const value = cell.getValue();
      const moduleObj = cell.row.original.module;
      const moduleName = (moduleObj as { name: string }).name;
      return (
        <span className="lowercase">
          {value}:{moduleName}
        </span>
      );
    },
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

// Config for the datatable view
const config: ITableConfig = {
  module: "permission",
  serverSide: false,
  permissions: {
    search: {
      isAllowed: true,
      placeholder: "Search",
    },
    add: {
      isAllowed: true,
      placeholder: "Add permission",
      popover: "Add new permission",
    },
    delete: {
      isAllowed: true,
      placeholder: "Delete",
      popover: "Delete this permission?",
    },
    update: {
      isAllowed: true,
      placeholder: "Edit",
      popover: "Update this permission?",
    },
  },
};

const formFields: IBaseFormGroupField[] = [
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
      placeholder: "Toggle this to turn on/off this permission",
    },
    error: {
      className: "float-right",
    },
  },
  {
    name: "moduleId",
    className: "my-2",
    label: {
      className: "w-full",
      value: "Module",
    },
    field: {
      type: "select",
      className: "input select w-full",
      placeholder: "Select a module",
      options: [],
    },
  },
  {
    name: "action",
    className: "my-2",
    label: {
      className: "w-full",
      value: "Action",
    },
    field: {
      type: "text",
      className: "input w-full",
      placeholder: "Action for the selected module above",
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
      placeholder: "Permission description.",
    },
  },
];

export const Permission = () => {
  const result = useQueries({
    queries: [
      {
        queryKey: [getAllPermissionsKey],
        queryFn: () => getAllPermissions(),
      },
      {
        queryKey: [getAllModulesKey],
        queryFn: () => getAllModules(),
      },
    ],
  });

  const [isFetching, isLoading] = result
    .map((res) => [res.isFetching, res.isLoading])
    .flat();

  const { dialog } = useDialogContext();
  const [confirmDialog, setConfirmDialog] = useState<IConfirmDialogContent>({
    open: false,
    module: "Permissions",
  });

  useEffect(() => {
    if (formFields[1].field.type !== "select" || !result[1]?.data) {
      return;
    }

    formFields[1].field.options = result[1].data?.data?.map(
      (mod: IModuleResponse) => ({
        key: mod.id,
        value: mod.name,
        className: "",
      })
    );
  }, [result]);

  const [form, setForm] = useState<IForm>({
    url,
    fetchQueryKey: getAllPermissionsKey,
    action: "create" as IAction, // defaults to create
    onAddFn: (data: DynamicObject) => addPermission(data as IPermissionInput),
    onUpdateFn: (id: string, data: DynamicObject) =>
      updatePermission(id, data as IPermissionInput),
    onDeleteFn: (id: string) => deletePermission(id),
    onRetrieveFn: (id: string) => retrievePermission(id),
    defaultValues: { active: true } as Record<string, unknown>,
  });

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
              schema={permissionSchema}
              moduleName="Permission"
              data={dialog.data}
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
