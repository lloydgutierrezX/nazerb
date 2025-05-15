import { useEffect, useState } from "react";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  HeaderGroup,
  Row,
  useReactTable,
} from "@tanstack/react-table";
import { DataTableHeader } from "./DataTableHeader";
import { DataTableBody } from "./DataTableBody";
import { IData } from "Pages/IData";
import { DatatableFilter } from "./DatatableFilter";
import { IDataTableProps } from "./IDatatable";

import {
  IHandleDialog,
  useDialogContext,
} from "Services/contexts/DialogContext";
import { Icon } from "Components/icon/Icon";
import { SkeletonTable } from "./SkeletonTable";

export const DataTable = <T extends IData>({
  data,
  columnDef,
  config,
  isFetching,
  refetch,
}: IDataTableProps<T>) => {
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [dataSource, setDataSource] = useState<T[]>(data);

  const { dialog, setDialog } = useDialogContext();

  useEffect(() => {
    setDataSource(data);
  }, [data]);

  // We check when the modal dialog.open value changes,
  // if it is closed and there are some data changes, we do refetch
  useEffect(() => {
    if (!dialog.open && dialog.hasChanges) refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dialog.open, dialog.hasChanges]);

  // Initialize the table instance
  const table = useReactTable<T>({
    data: dataSource,
    columns: columnDef,

    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),

    getFilteredRowModel: !config.serverSide ? getFilteredRowModel() : undefined,
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

  if (isFetching) {
    return <SkeletonTable />;
  }

  return (
    <>
      <div className="flex items-center justify-between pt-4">
        <DatatableFilter
          filterRowModel={
            table.getFilteredRowModel as unknown as () => {
              rows: Row<IData>[];
            }
          }
          setGlobalFilter={setGlobalFilter}
          searchPlaceholder={config.permissions.search?.placeholder}
        />

        {config.permissions.add.isAllowed && (
          <button
            className="btn btn-primary hover:text-blue-500 hover:bg-blue-100"
            onClick={() => {
              handleDialog({ toggle: true, action: "add" });
            }}
          >
            <Icon icon="plus" classNames="w-4 h-4" />
            <span className="">
              {config.permissions.add.placeholder ?? "Create"}
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
            permissions={config.permissions}
            handleDialog={handleDialog}
          />
        </table>
      </div>
    </>
  );
};
