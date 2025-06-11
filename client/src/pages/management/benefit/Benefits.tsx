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
  useGetAllEmployeeBenefit,
  getAllEmployeeBenefitKey,
  addEmployeeBenefit,
  updateEmployeeBenefit,
  deleteEmployeeBenefit,
  retrieveEmployeeBenefit,
} from "./BenefitsAction";
import { IBenefitInput } from "./IBenefit";
import { Icon } from "Components/icon/Icon";
import { BenefitSchema } from "./BenefitSchema";

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
    accessorKey: "type", // key
    header: "Type", // header name
    cell: (info: { getValue: () => string }) => info.getValue(),
    enableSorting: true,
    sortUndefined: -1,
    sortDescFirst: false,
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
  module: "EmployeeBenefit",
  serverSide: false,
  permissions: {
    search: {
      isAllowed: true,
      placeholder: "Search",
    },
    add: {
      isAllowed: true,
      placeholder: "Add EmployeeBenefit",
      popover: "Add new EmployeeBenefit?",
    },
    delete: {
      isAllowed: true,
      placeholder: "Delete",
      popover: "Delete this EmployeeBenefit?",
    },
    update: {
      isAllowed: true,
      placeholder: "Edit",
      popover: "Update this EmployeeBenefit?",
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
      placeholder: "Toggle this to turn on/off this EmployeeBenefit",
    },
    error: {
      className: "text-left",
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
      placeholder: "Input the EmployeeBenefit name",
    },
  },
  {
    name: "type",
    className: "my-2",
    label: {
      className: "w-full",
      value: "Type",
    },
    field: {
      type: "select",
      className: "input w-full",
      options: [
        {
          key: 'debit',
          value: 'Debit',
          className: ''
        },
        {
          key: 'credit',
          value: 'Credit',
          className: ''
        }
      ],
      placeholder: "Input the EmployeeBenefit name",
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
      placeholder: "Input the EmployeeBenefit description",
      className: "h-40 w-full",
    },
  },
];

export const EmployeeBenefit = () => {
  const { data, isFetching, isLoading, error } = useGetAllEmployeeBenefit();
  const { dialog } = useDialogContext();
  const [confirmDialog, setConfirmDialog] = useState<IConfirmDialogContent>({
    open: false,
    module: "EmployeeBenefit",
  });

  const [form, setForm] = useState({
    url: "/management/employee-benefit",
    fetchQueryKey: getAllEmployeeBenefitKey,
    action: "create" as IAction, // defaults to create
    onAddFn: (data: DynamicObject) =>
      addEmployeeBenefit(data as IBenefitInput),
    onUpdateFn: (id: string, data: DynamicObject) =>
      updateEmployeeBenefit(id, data as IBenefitInput),
    onDeleteFn: (id: string) => deleteEmployeeBenefit(id),
    onRetrieveFn: (id: string) => retrieveEmployeeBenefit(id),
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
              schema={BenefitSchema}
              moduleName="EmployeeBenefit"
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
