import { flexRender } from "@tanstack/react-table";
import { Icon } from "Components/icon/Icon";
import { DataTableBodyProps } from "./IDatatable";
import { useConfirmDialogContext } from "Services/contexts/ConfirmDialogContext";
import { useDialogContext } from "Services/contexts/DialogContext";
import { useFormContext } from "Services/contexts/FormContext";
import { IAction } from "Components/field/IForm";

export const DataTableBody = <
  TData extends Record<string, unknown> | undefined
>({
  rowModel,
  permissions,
}: DataTableBodyProps<TData>) => {
  const { dialog, setDialog } = useDialogContext();
  const { confirmDialog, setConfirmDialog } = useConfirmDialogContext();
  const { form, setForm } = useFormContext();

  const handleAction = (
    id: string,
    action: IAction,
    data?: Record<string, unknown>
  ) => {
    setForm({ ...form, action });
    if (action === "update") {
      setDialog({ ...dialog, data, open: true });
      return;
    }

    setConfirmDialog({ ...confirmDialog, id, action, open: true });
  };

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
                    row.original &&
                    handleAction(
                      row.original.id as string,
                      "update",
                      row.original
                    )
                  }
                  className="btn scale-75 btn-primary btn-square hover:text-blue-500 hover:bg-blue-100"
                >
                  <Icon icon="pencil-off" classNames="" />
                </button>
              )}

              {permissions.delete.isAllowed && row.original?.active ? (
                <button
                  onClick={() =>
                    row.original &&
                    handleAction(row.original.id as string, "delete")
                  }
                  className="btn scale-75 btn-error text-white btn-square hover:text-red-500 hover:bg-red-100"
                >
                  <Icon icon="trash" classNames="" />
                </button>
              ) : (
                <button
                  className="btn scale-75 btn-primary text-white btn-square hover:text-blue-500 hover:bg-blue-100"
                  onClick={() =>
                    row.original &&
                    handleAction(row.original.id as string, "retrieve")
                  }
                >
                  <Icon icon="rotate-ccw" classNames="" />
                </button>
              )}
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  );
};
