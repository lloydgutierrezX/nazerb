type IPermissionsConfig = {
  isAllowed: boolean;
  placeholder?: string;
}

export type IPermissions = {
  search: IPermissionsConfig;
  add: IPermissionsConfig;
  delete: IPermissionsConfig;
  update: IPermissionsConfig;
}

export type ITableConfig = {
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