import { memo, useEffect, useState } from "react";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  HeaderGroup,
  Row,
  useReactTable,
} from "@tanstack/react-table";
import { DataTableHeader } from "./THeader";
import { DataTableBody } from "./TBody";
import { IData } from "Pages/IData";
import { DatatableFilter } from "./TFilters";
import { IDataTableProps, ITNavigationConfig } from "./IDatatable";

import {
  IDialogContent,
  useDialogContext,
} from "Services/contexts/DialogContext";
import { Icon } from "Components/icon/Icon";
import { SkeletonTable } from "./TSkeleton";
import { useFormContext } from "Services/contexts/FormContext";
import { TNavigation } from "./TNavigation";

export const DataTable = memo(function DataTable<T extends IData>({
  data,
  columnDef,
  config,
  isFetching,
}: IDataTableProps<T>) {
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [dataSource, setDataSource] = useState<T[]>(data);
  const { dialog, setDialog } = useDialogContext();
  const { form, setForm } = useFormContext();

  useEffect(() => {
    setDataSource(data);
  }, [data]);

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

    getPaginationRowModel: getPaginationRowModel(),
  });

  const handleDialog = (params: IDialogContent) => {
    setDialog({
      ...dialog,
      open: params.open,
    });

    setForm({ ...form, action: "create" });
  };

  const navConfig: ITNavigationConfig[] = [
    {
      icon: "chevrons-left",
      popover: "Move to first page",
      disabled: !table.getCanPreviousPage(),
      onClick: () => table.setPageIndex(0),
    },
    {
      icon: "chevron-left",
      popover: "Move to previous page",
      disabled: !table.getCanPreviousPage(),
      onClick: () => table.previousPage(),
    },
    {
      icon: "chevron-right",
      popover: "Move to next page",
      disabled: !table.getCanNextPage(),
      onClick: () => table.nextPage(),
    },
    {
      icon: "chevrons-right",
      popover: "Move to last page",
      disabled: !table.getCanNextPage(),
      onClick: () => table.lastPage(),
    },
  ];

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
              handleDialog({ open: true });
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
          />
        </table>
      </div>
      <div className="my-2 flex flex-row gap-5">
        <div className="flex flex-row gap-2 grow">
          <span>Showing page</span> {table.getState().pagination.pageIndex + 1}
          <span>of {table.getPageCount()}</span>
        </div>
        <TNavigation config={navConfig} />
      </div>
    </>
  );
});
