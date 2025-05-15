import { ColumnDef, Row } from "@tanstack/react-table";
import { IData } from "Pages/IData";
import { IHandleDialog } from "Services/contexts/DialogContext";

export type IDataTableProps<T extends IData> = {
  data: T[];
  columnDef: ColumnDef<T, string>[];
  config: ITableConfig;
  isFetching: boolean;
  refetch: () => void;
}

type IPermissionsConfig = {
  isAllowed: boolean;
  placeholder?: string;
  popover?: string;
}

export type IPermissions = {
  search: IPermissionsConfig;
  add: IPermissionsConfig;
  delete: IPermissionsConfig;
  update: IPermissionsConfig;
}

export type ITableConfig = {
  module: string;
  serverSide: boolean;
  permissions: IPermissions;
  filters?: {
    date?: {
      name: string;
      defaultValue?: string;
      placeholder?: string;
    }[];
    dateRange?: {
      startDateName: string;
      endDateName: string;
      defaultValue?: string;
      placeholder?: string;
    }[],
    select?: {
      name: string;
      placeholder?: string;
      type: "select" | "multi-select";
    }[];
  }
};

export type DataTableBodyProps<TData> = {
  rowModel: () => {
    rows: Row<TData>[];
  };
  permissions: IPermissions;
  handleDialog: (params: IHandleDialog) => void;
};