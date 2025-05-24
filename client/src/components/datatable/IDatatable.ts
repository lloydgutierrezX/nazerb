import { ColumnDef } from "@tanstack/react-table";
import { DynamicObject } from "Utils/globalInterface";

export type IDataTableProps<T extends DynamicObject> = {
  data: T[];
  columnDef: ColumnDef<T, string>[];
  config: ITableConfig;
  isFetching: boolean;
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

export type IPagination = {
  page: number,
  limit: number
}

export type IFilterDate = {
  name: string;
  defaultValue?: string;
  placeholder?: string;
}

export type IFilterDateRange = {
  startDateName: string;
  endDateName: string;
  defaultValue?: string;
  placeholder?: string;
}

export type IFilterSelect = {
  name: string;
  placeholder?: string;
  type: "select" | "multi-select";
}

export type ITableConfig = {
  module: string;
  serverSide: boolean;
  permissions: IPermissions;
  serverConfig?: {
    filters: {
      query: string;
      date: IFilterDate;
      dateRange: IFilterDateRange,
      select: IFilterSelect[];
    },
    pagination: IPagination
  }
};

export type ITNavigationConfig = {
  icon: string;
  popover: string;
  disabled: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>
}