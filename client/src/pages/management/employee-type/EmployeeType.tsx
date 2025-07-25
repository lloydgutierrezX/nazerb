import { ColumnDef } from "@tanstack/react-table";
import { ITableConfig } from "Components/datatable/IDatatable";
import { DataTable } from "Components/datatable/Table";
import { FormGroup } from "Components/field/FormGroup";
import { IAction, IBaseFormGroupField } from "Components/field/IForm";

import { ConfirmDialog } from "Components/modal/confirm/Confirm";
import { Dialog } from "Components/modal/dialog/Dialog";
import moment from "moment";
import { useEffect, useState } from "react";
import {
  IConfirmDialogContent,
  ConfirmDialogContext,
} from "Services/contexts/ConfirmDialogContext";
import { useDialogContext } from "Services/contexts/DialogContext";
import { FormContext } from "Services/contexts/FormContext";
import { DynamicObject } from "Utils/globalInterface";
import {
  url,
  useGetAllEmployeeType,
  getAllEmployeeTypeKey,
  addEmployeeType,
  updateEmployeeType,
  deleteEmployeeType,
  retrieveEmployeeType,
} from "./EmployeeTypeActions";
import { IEmployeeTypeInput } from "./IEmployeeType";
import { Icon } from "Components/icon/Icon";
import { employeeTypeSchema } from "./EmployeeTypeSchema";

// ColumnsDef: for react-table column display
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

// Config for the datatable view
const config: ITableConfig = {
  module: "employee type",
  serverSide: false,
  permissions: {
    search: {
      isAllowed: true,
      placeholder: "Search",
    },
    add: {
      isAllowed: true,
      placeholder: "Add Employee Type",
      popover: "Add new employee type",
    },
    delete: {
      isAllowed: true,
      placeholder: "Delete",
      popover: "Delete this employee type?",
    },
    update: {
      isAllowed: true,
      placeholder: "Edit",
      popover: "Update this employee type?",
    },
  },
};

const formGroupFields: IBaseFormGroupField[] = [
  {
    name: "active",
    className: "flex flex-row w-full text-left content-center",
    label: {
      className: "w-full justify-end",
      value: "Is Actve?",
    },
    field: {
      type: "checkbox",
      className: "flex dirc checkbox",
      placeholder: "Toggle this to turn on/off this employee type",
    },
    error: {
      className: "text-left",
    },
  },
  {
    name: "code",
    className: "my-2",
    label: {
      className: "w-full",
      value: "Code",
    },
    field: {
      type: "text",
      className: "input w-full",
      placeholder: "Employee type's code",
    },
  },
  {
    name: "name",
    className: "my-2",
    label: {
      className: "w-full",
      value: "Name",
    },
    field: {
      type: "text",
      className: "input w-full",
      placeholder: "Employee type's name",
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
      placeholder: "Employee type's description",
      className: "h-40 w-full",
    },
  },
];

export const EmployeeType = () => {
  const { data, isFetching, isLoading, error } = useGetAllEmployeeType();
  const { dialog } = useDialogContext();
  const [confirmDialog, setConfirmDialog] = useState<IConfirmDialogContent>({
    open: false,
    module: "Employee Type",
  });

  const [form, setForm] = useState({
    url,
    fetchQueryKey: getAllEmployeeTypeKey,
    action: "create" as IAction, // defaults to create
    onAddFn: (data: DynamicObject) =>
      addEmployeeType(data as IEmployeeTypeInput),
    onUpdateFn: (id: string, data: DynamicObject) =>
      updateEmployeeType(id, data as IEmployeeTypeInput),
    onDeleteFn: (id: string) => deleteEmployeeType(id),
    onRetrieveFn: (id: string) => retrieveEmployeeType(id),
  });

  const [record, setRecord] = useState(data);

  useEffect(() => {
    setRecord(() => (error ? [] : data));
    // show toast in the future...
  }, [data, error]);

  return (
    <>
      <FormContext.Provider value={{ form, setForm }}>
        <ConfirmDialogContext.Provider
          value={{ confirmDialog, setConfirmDialog }}
        >
          <ConfirmDialog />
          <Dialog>
            <FormGroup
              formFields={formGroupFields}
              schema={employeeTypeSchema}
              moduleName="Employee Type"
              data={dialog.data}
            />
          </Dialog>

          <DataTable
            data={record ?? []}
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
