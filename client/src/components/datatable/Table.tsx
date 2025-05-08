import { useEffect, useState } from "react";
import {
  ColumnDef,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { TableHeader } from "./TableHeader";
import { TableBody } from "./TableBody";
import { IData } from "../../pages/IData";

export type ITableConfig = {
  serverSide: boolean;
  permissions: {
    search: boolean;
    add: boolean;
    delete: boolean;
    edit: boolean;
  };
};

export const DaaTable = <T extends IData>(props: {
  data: T[];
  columns: ColumnDef<T, string>[];
  config: ITableConfig;
}) => {
  const [dataSource, setDataSource] = useState(props.data);

  useEffect(() => {
    setDataSource(props.data);
  }, [props.data]);

  // Initialize the table instance
  const table = useReactTable<T>({
    data: dataSource,
    columns: props.columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
      <table className="table">
        <TableHeader headerGroups={table.getHeaderGroups} />
        <TableBody
          rowModel={table.getRowModel}
          permissions={props.config.permissions}
        />
      </table>
    </div>
  );
};
