import { useEffect, useState } from "react";
import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  HeaderGroup,
  Row,
  useReactTable,
} from "@tanstack/react-table";
import { DataTableHeader } from "./DataTableHeader";
import { DataTableBody } from "./DataTableBody";
import { IData } from "../../pages/IData";
import { DatatableFilter } from "./DatatableFilter";
import { ITableConfig } from "./IDatatable";
import { Icon } from "../icon/Icon";
import {
  IHandleDialog,
  useDialogContext,
} from "../../services/contexts/DialogContext";

export const DataTable = <T extends IData>(props: {
  data: T[];
  columnDef: ColumnDef<T, string>[];
  config: ITableConfig;
}) => {
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [dataSource, setDataSource] = useState(props.data);

  const { dialog, setDialog } = useDialogContext();

  useEffect(() => {
    setDataSource(props.data);
  }, [props.data]);

  // Initialize the table instance
  const table = useReactTable<T>({
    data: dataSource,
    columns: props.columnDef,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),

    getFilteredRowModel: !props.config.serverSide
      ? getFilteredRowModel()
      : undefined,
    globalFilterFn: "includesString",

    onGlobalFilterChange: setGlobalFilter,
    state: {
      globalFilter,
    },
  });

  const handleDialog = (params: IHandleDialog) => {
    setDialog({
      ...dialog,
      open: params.toggle,
    });
  };

  return (
    <>
      <div className="flex items-center justify-between pt-4">
        <DatatableFilter
          filterRowModel={
            table.getFilteredRowModel as unknown as () => { rows: Row<IData>[] }
          }
          setGlobalFilter={setGlobalFilter}
          searchPlaceholder={props.config.permissions.search?.placeholder}
        />

        {props.config.permissions.add.isAllowed && (
          <button
            className="btn btn-primary hover:text-blue-500 hover:bg-blue-100"
            onClick={() => {
              handleDialog({ toggle: true, action: "add" });
            }}
          >
            <Icon icon="plus" classNames="w-4 h-4" />
            <span className="">
              {props.config.permissions.add.placeholder ?? "Create"}
            </span>
          </button>
        )}
      </div>

      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 shadow-md">
        <table className="table">
          <DataTableHeader
            headerGroups={
              table.getHeaderGroups as unknown as () => HeaderGroup<IData>[]
            }
          />
          <DataTableBody
            rowModel={table.getRowModel}
            permissions={props.config.permissions}
            handleDialog={handleDialog}
          />
        </table>
      </div>
    </>
  );
};
