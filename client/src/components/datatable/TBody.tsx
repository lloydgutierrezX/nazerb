import { flexRender, Row } from "@tanstack/react-table";
import { Icon } from "Components/icon/Icon";
import { IPermissions } from "./IDatatable";
import { useConfirmDialogContext } from "Services/contexts/ConfirmDialogContext";
import { useDialogContext } from "Services/contexts/DialogContext";
import { useFormContext } from "Services/contexts/FormContext";
import { IAction } from "Components/field/IForm";

type DataTableBodyProps<TData> = {
  rowModel: () => {
    rows: Row<TData>[];
  };
  permissions: IPermissions;
  disabled: boolean;
};

export const DataTableBody = <
  TData extends Record<string, unknown> | undefined
>({
  rowModel,
  permissions,
  disabled,
}: DataTableBodyProps<TData>) => {
  const { setDialog } = useDialogContext();
  const { setConfirmDialog } = useConfirmDialogContext();
  const { setForm } = useFormContext();

  const handleAction = (
    id: string,
    action: IAction,
    data?: Record<string, unknown>
  ) => {
    setForm((prev) => ({ ...prev, action }));
    if (action === "update") {
      setDialog((prev) => ({ ...prev, data, open: true }));
      return;
    }

    setConfirmDialog((prev) => ({ ...prev, id, action, open: true }));
  };

  const rows = rowModel().rows;

  return (
    <tbody>
      {rows.length > 0 ? (
        rows.map((row) => (
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
                    disabled={disabled}
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
                    disabled={disabled}
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
                    disabled={disabled}
                  >
                    <Icon icon="rotate-ccw" classNames="" />
                  </button>
                )}
              </div>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={100} className="full-w text-center">
            No recod found
          </td>
        </tr>
      )}
    </tbody>
  );
};
