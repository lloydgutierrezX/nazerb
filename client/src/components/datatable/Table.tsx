import { memo, useEffect, useState } from "react";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  HeaderGroup,
  Row,
  Table,
  useReactTable,
} from "@tanstack/react-table";
import { DataTableHeader } from "./THeader";
import { DataTableBody } from "./TBody";
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
import { DynamicObject } from "Utils/globalInterface";

type IPaginationButton = "first" | "previous" | "next" | "last";
const isDisabled = <T,>(
  tableFetching: boolean,
  table?: Table<T>,
  paginationButton?: IPaginationButton
) => {
  switch (paginationButton) {
    case "first":
    case "previous":
      return tableFetching || !table?.getCanPreviousPage();

    case "next":
    case "last":
      return tableFetching || !table?.getCanNextPage();

    default:
      return tableFetching;
  }
};

export const DataTable = memo(function DataTable<T extends DynamicObject>({
  data,
  columnDef,
  config,
  isFetching,
  isLoading,
}: IDataTableProps<T>) {
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [dataSource, setDataSource] = useState<T[]>(data);
  const { setDialog } = useDialogContext();
  const { setForm } = useFormContext();

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
    setDialog((prev) => ({
      ...prev,
      open: params.open,
    }));

    setForm((prev) => ({ ...prev, action: "create" }));
  };

  const navConfig: ITNavigationConfig[] = [
    {
      icon: "chevrons-left",
      popover: "Move to first page",
      disabled: isDisabled(isFetching, table, "first"),
      onClick: () => table.setPageIndex(0),
    },
    {
      icon: "chevron-left",
      popover: "Move to previous page",
      disabled: isDisabled(isFetching, table, "previous"),
      onClick: () => table.previousPage(),
    },
    {
      icon: "chevron-right",
      popover: "Move to next page",
      disabled: isDisabled(isFetching, table, "next"),
      onClick: () => table.nextPage(),
    },
    {
      icon: "chevrons-right",
      popover: "Move to last page",
      disabled: isDisabled(isFetching, table, "last"),
      onClick: () => table.lastPage(),
    },
  ];

  return (
    <>
      <div className="flex items-center justify-between pt-4">
        <DatatableFilter
          filterRowModel={
            table.getFilteredRowModel as unknown as () => {
              rows: Row<DynamicObject>[];
            }
          }
          setGlobalFilter={setGlobalFilter}
          searchPlaceholder={config.permissions.search?.placeholder}
          disabled={isDisabled(isFetching || isLoading)}
        />

        {config.permissions.add.isAllowed && (
          <button
            disabled={isDisabled(isFetching || isLoading)}
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
              table.getHeaderGroups as unknown as () => HeaderGroup<DynamicObject>[]
            }
            showLoading={isFetching || isLoading}
          />

          {isLoading ? (
            <SkeletonTable columnCount={columnDef.length} type="column" />
          ) : (
            <DataTableBody
              rowModel={table.getRowModel}
              permissions={config.permissions}
              disabled={isDisabled(isFetching || isLoading)}
            />
          )}
        </table>
      </div>
      <div className="my-2 flex flex-row gap-5">
        <div className="flex flex-row gap-2 grow">
          {!isFetching && (
            <>
              <span>Showing page </span>
              <span>{table.getState().pagination.pageIndex + 1}</span>
              <span> of {table.getPageCount()}</span>
            </>
          )}
        </div>
        <TNavigation config={navConfig} />
      </div>
    </>
  );
});
