import { Row, flexRender } from "@tanstack/react-table";
import { Icon } from "../icon/Icon";

interface TableBodyProps<TData> {
  rowModel: () => {
    rows: Row<TData>[];
  };
  permissions: {
    edit: boolean;
    delete: boolean;
  };
}

export const TableBody = <TData,>({
  rowModel,
  permissions,
}: TableBodyProps<TData>) => {
  const rows = rowModel().rows;

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
              {permissions.edit && (
                <button className="btn scale-75 btn-square hover:text-blue-500 hover:bg-blue-100">
                  <Icon icon="penciloff" classNames="" />
                </button>
              )}
              {permissions.delete && (
                <button className="btn scale-75 btn-square hover:text-red-500 hover:bg-red-100">
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
