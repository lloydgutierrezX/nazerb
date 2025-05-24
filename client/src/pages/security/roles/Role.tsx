import moment from "moment";

import { ColumnDef } from "@tanstack/react-table";
import { IData } from "Pages/IData";
import { Icon } from "Components/icon/Icon";
import { ITableConfig } from "Components/datatable/IDatatable";
import { IAction, IFormField } from "Components/field/IForm";
import { useState } from "react";
import {
  ConfirmDialogContext,
  IConfirmDialogContent,
} from "Services/contexts/ConfirmDialogContext";
import { useDialogContext } from "Services/contexts/DialogContext";
import { DynamicObject } from "Utils/globalInterface";
import {
  url,
  getAllRolesKey,
  useGetAllRoles,
  addRole,
  deleteRole,
  retrieveRole,
  updateRole,
} from "./RoleActions";
import { IRoleInput } from "./IRole";
import { DataTable } from "Components/datatable/Table";
import { ConfirmDialog } from "Components/modal/confirm/Confirm";
import { Dialog } from "Components/modal/dialog/Dialog";
import { FormGroup } from "Components/field/FormGroup";
import { FormContext } from "Services/contexts/FormContext";
import { moduleSchema } from "../module/ModuleSchema";

const columnDef: ColumnDef<IData, string>[] = [
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

const formFields: IFormField[] = [
  {
    type: "toggle",
    placeholder: "Toggle this to turn on/off this module",
    name: "active",
    className: "justify-end",
    containerClassName: "flex flex-row gap-2",
    defaultChecked: true,
    label: "Is Actve?",
    labelClassName: "w-full justify-end",
  },
  {
    type: "text",
    placeholder: "Input the module name",
    name: "name",
    label: "Role Name",
    labelClassName: "w-full",
    className: "",
  },
  {
    type: "textarea",
    placeholder: "Input the module description",
    name: "description",
    label: "Description",
    labelClassName: "w-full",
    className: "h-40",
  },
];

export const Role = () => {
  const { data, isFetching } = useGetAllRoles();
  const { dialog } = useDialogContext();
  const [confirmDialog, setConfirmDialog] = useState<IConfirmDialogContent>({
    open: false,
    module: "Roles",
  });
  const [form, setForm] = useState({
    url: url,
    fetchQueryKey: getAllRolesKey,
    action: "create" as IAction, // defaults to create
    onAddFn: (data: DynamicObject) => addRole(data as IRoleInput),
    onUpdateFn: (id: string, data: DynamicObject) =>
      updateRole(id, data as IRoleInput),
    onDeleteFn: (id: string) => deleteRole(id),
    onRetrieveFn: (id: string) => retrieveRole(id),
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
              schema={moduleSchema}
              moduleName="Role"
              data={dialog.data}
            />
          </Dialog>

          <DataTable
            data={data ?? []}
            columnDef={columnDef}
            config={config}
            isFetching={isFetching}
          />
        </ConfirmDialogContext.Provider>
      </FormContext.Provider>
    </>
  );
};
