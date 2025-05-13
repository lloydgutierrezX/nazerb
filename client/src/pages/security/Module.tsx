import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../../components/datatable/DataTable";
import { IData } from "../IData";
import { ITableConfig } from "../../components/datatable/IDatatable";
import { Dialog } from "../../components/modal/dialog/Dialog";
import { Form, IFormField } from "../../components/field/Form";
import { moduleSchema } from "./ModuleSchema";
import moment from "moment";
import { FormContext } from "../../services/contexts/FormContext";

// data
const data: IData[] = [
  {
    id: 1,
    name: "Modules",
    created_at: "2025-12-12 07:42:35.363",
    updated_at: "2025-12-12 10:41:35.363",
  },
  {
    id: 2,
    name: "Roles",
    created_at: "2025-01-01 10:42:35.363",
    updated_at: "2025-01-01 11:10:35.363",
  },
  {
    id: 3,
    name: "Permissions",
    created_at: "2025-03-03 07:41:35.363",
    updated_at: "2025-03-03 07:41:35.363",
  },
];

// Columns
const columnDef: ColumnDef<IData, string>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: (info: { getValue: () => string }) => info.getValue(),
    enableSorting: true,
    sortUndefined: -1,
    sortDescFirst: false,
  },
  {
    accessorKey: "created_at",
    header: "Date Created",
    cell: (info: { getValue: () => string }) =>
      moment(info.getValue()).format("MMM DD, YYYY"),
    enableSorting: true,
    sortUndefined: -1,
    sortDescFirst: false,
    enableGlobalFilter: false,
  },
  {
    accessorKey: "updated_at",
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
  filters: {
    date: [
      {
        name: "created_at",
        placeholder: "Date Created",
      },
      {
        name: "updated_at",
        placeholder: "Last Update",
      },
    ],
  },
};

const formFields: IFormField[] = [
  {
    type: "toggle",
    placeholder: "Toggle this to turn on/off this module",
    name: "is_active",
    value: true,
    className: "justify-end",
    containerClassName: "flex flex-row gap-2",
    defaultChecked: true,
    label: "Is Actve?",
    labelClassName: "w-full justify-end",
    validations: {},
  },
  {
    type: "text",
    placeholder: "Input the module name",
    name: "name",
    label: "Module Name",
    labelClassName: "w-full",
    value: "",
    className: "",
    validations: {
      required: "Module name is reuqired.",
      minLength: 4,
      maxLength: 60,
    },
  },
];

export const Module = () => {
  return (
    <>
      <Dialog>
        <FormContext.Provider value={undefined}>
          <Form
            formFields={formFields}
            schema={moduleSchema}
            moduleName="Module"
          />
        </FormContext.Provider>
      </Dialog>

      <DataTable data={data} columnDef={columnDef} config={config} />
    </>
  );
};
