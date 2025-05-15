import { flexRender } from "@tanstack/react-table";
import { Icon } from "Components/icon/Icon";
import { DataTableBodyProps } from "./IDatatable";
import { useDialogContext } from "Services/contexts/DialogContext";

export const DataTableBody = <TData,>({
  rowModel,
  permissions,
}: DataTableBodyProps<TData>) => {
  const { dialog, setDialog } = useDialogContext();
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
              {permissions.update.isAllowed && (
                <button
                  onClick={() =>
                    setDialog({ ...dialog, data: row.original, open: true })
                  }
                  className="btn scale-75 btn-primary btn-square hover:text-blue-500 hover:bg-blue-100"
                >
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
