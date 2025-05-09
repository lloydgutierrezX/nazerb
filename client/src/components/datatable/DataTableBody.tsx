import { Row, flexRender } from "@tanstack/react-table";
import { Icon } from "../icon/Icon";
import { IPermissions } from "./IDatatable";

type DataTableBodyProps<TData> = {
  rowModel: () => {
    rows: Row<TData>[];
  };
  permissions: IPermissions;
};

export const DataTableBody = <TData,>({
  rowModel,
  permissions,
}: DataTableBodyProps<TData>) => {
  const rows = rowModel().rows;

  console.log(permissions.delete.isAllowed);

  return (
    <tbody>
      {rows.map((row) => (
        <tr key={row.id}>
          {row.getVisibleCells().map((cell) => {
            return (
              <td key={cell.id}>
                {
                  flexRender(cell.column.columnDef.cell, cell.getContext())
                  /* Render the cell content using flexRender */
                }
              </td>
            );
          })}

          <td>
            <div className="flex justify-center">
              {permissions.update.isAllowed && (
                <button className="btn scale-75 btn-primary btn-square hover:text-blue-500 hover:bg-blue-100">
                  <Icon icon="penciloff" classNames="" />
                </button>
              )}
              {permissions.delete.isAllowed && (
                <button className="btn scale-75 btn-error text-white btn-square hover:text-red-500 hover:bg-red-100">
                  <Icon icon="trash" classNames="" />
                </button>
              )}
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  );
};
