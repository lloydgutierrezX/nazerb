import { ColumnDef } from "@tanstack/react-table";
import { ITableConfig } from "Components/datatable/IDatatable";
import { IAction, IFormField } from "Components/field/IForm";
import { Icon } from "Components/icon/Icon";
import moment from "moment";
import { IData } from "Pages/IData";
import {
  addPermission,
  deletePermission,
  getAllPermissionsKey,
  retrievePermission,
  updatePermission,
  url,
  useGetAllPermissions,
} from "./PermissionActions";
import { useDialogContext } from "Services/contexts/DialogContext";
import { useState } from "react";
import {
  ConfirmDialogContext,
  IConfirmDialogContent,
} from "Services/contexts/ConfirmDialogContext";
import { DynamicObject } from "Utils/globalInterface";
import { IPermissionInput } from "./IPermission";
import { DataTable } from "Components/datatable/Table";
import { ConfirmDialog } from "Components/modal/confirm/Confirm";
import { Dialog } from "Components/modal/dialog/Dialog";
import { Form } from "Components/field/Form";
import { FormContext } from "Services/contexts/FormContext";
import { moduleSchema } from "../module/ModuleSchema";

// ColumnsDef: for react-table column display
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
    label: "Permission Name",
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

export const Permission = () => {
  const { data, isFetching } = useGetAllPermissions();
  const { dialog } = useDialogContext();
  const [confirmDialog, setConfirmDialog] = useState<IConfirmDialogContent>({
    open: false,
    module: "Permissions",
  });

  const [form, setForm] = useState({
    url,
    fetchQueryKey: getAllPermissionsKey,
    action: "create" as IAction, // defaults to create
    onAddFn: (data: DynamicObject) => addPermission(data as IPermissionInput),
    onUpdateFn: (id: string, data: DynamicObject) =>
      updatePermission(id, data as IPermissionInput),
    onDeleteFn: (id: string) => deletePermission(id),
    onRetrieveFn: (id: string) => retrievePermission(id),
  });

  return (
    <>
      <FormContext.Provider value={{ form, setForm }}>
        <ConfirmDialogContext.Provider
          value={{ confirmDialog, setConfirmDialog }}
        >
          <ConfirmDialog />
          <Dialog>
            <Form
              formFields={formFields}
              schema={moduleSchema}
              moduleName="Permission"
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
