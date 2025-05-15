import { ReactNode } from "react";
import { useDialogContext } from "Services/contexts/DialogContext";

export const Dialog = ({ children }: { children: ReactNode }) => {
  const { dialog, setDialog } = useDialogContext();

  const closeDialog = () => {
    setDialog(() => {
      return {
        ...dialog,
        data: undefined,
        hasChanges: false,
        open: false,
      };
    });
  };

  return (
    <>
      <input
        type="checkbox"
        id="dialog"
        className="modal-toggle"
        checked={dialog.open}
        readOnly
      />

      <div className="modal" role="dialog">
        <div className="modal-box">
          <div className="modal-action">
            <label
              htmlFor="dialog"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={closeDialog}
            >
              ✕
            </label>
          </div>

          {children}
        </div>
      </div>
    </>
  );
};
