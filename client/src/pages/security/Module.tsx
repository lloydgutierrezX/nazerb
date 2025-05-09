import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../../components/datatable/DataTable";
import { IData } from "../IData";
import { ITableConfig } from "../../components/datatable/IDatatable";
import moment from "moment";

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
const columns: ColumnDef<IData, string>[] = [
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
  serverSide: false,
  permissions: {
    search: {
      isAllowed: true,
      placeholder: "Search",
    },
    add: {
      isAllowed: true,
      placeholder: "Create",
    },
    delete: {
      isAllowed: true,
      placeholder: "Delete",
    },
    update: {
      isAllowed: true,
      placeholder: "Edit",
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

export const Module = () => {
  return <DataTable data={data} columns={columns} config={config} />;
};
