import { ColumnDef } from "@tanstack/react-table";

import { IData } from "Pages/IData";

import { DataTable } from "Components/datatable/Table";
import { ITableConfig } from "Components/datatable/IDatatable";
import { Dialog } from "Components/modal/dialog/Dialog";
import { Form } from "Components/field/Form";
import { moduleSchema } from "./ModuleSchema";

import moment from "moment";
import {
  useGetAllModules,
  addModule,
  deleteModule,
  retrieveModule,
  updateModule,
  getAllModulesKey,
} from "./ModuleActions";
import { useDialogContext } from "Services/contexts/DialogContext";
import { Icon } from "Components/icon/Icon";
import { ConfirmDialog } from "Components/modal/confirm/Confirm";
import {
  ConfirmDialogContext,
  IConfirmDialogContent,
} from "Services/contexts/ConfirmDialogContext";
import { useState } from "react";
import { FormContext } from "Services/contexts/FormContext";
import { DynamicObject } from "Utils/globalInterface";
import { IAction, IFormField } from "Components/field/IForm";
import { IModuleInput } from "./IModule";

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
  module: "module",
  serverSide: false,
  permissions: {
    search: {
      isAllowed: true,
      placeholder: "Search",
    },
    add: {
      isAllowed: true,
      placeholder: "Add module",
      popover: "Add new module",
    },
    delete: {
      isAllowed: true,
      placeholder: "Delete",
      popover: "Delete this module?",
    },
    update: {
      isAllowed: true,
      placeholder: "Edit",
      popover: "Update this module?",
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
    label: "Module Name",
    labelClassName: "w-full",
    className: "",
  },
  {
    type: "text",
    placeholder: "Input module link",
    name: "link",
    label: "URL",
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

export const Module = () => {
  const { data, isFetching } = useGetAllModules();
  const { dialog } = useDialogContext();
  const [confirmDialog, setConfirmDialog] = useState<IConfirmDialogContent>({
    open: false,
    module: "Modules",
  });
  const [form, setForm] = useState({
    url: "/modules",
    fetchQueryKey: getAllModulesKey,
    action: "create" as IAction, // defaults to create
    onAddFn: (data: DynamicObject) => addModule(data as IModuleInput),
    onUpdateFn: (id: string, data: DynamicObject) =>
      updateModule(id, data as IModuleInput),
    onDeleteFn: (id: string) => deleteModule(id),
    onRetrieveFn: (id: string) => retrieveModule(id),
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
              moduleName="Module"
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
