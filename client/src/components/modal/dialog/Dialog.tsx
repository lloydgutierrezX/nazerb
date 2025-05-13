import { ReactNode } from "react";
import { useDialogContext } from "../../../services/contexts/DialogContext";

export const Dialog = (props: { children: ReactNode }) => {
  const { dialog, setDialog } = useDialogContext();

  const closeDialog = () => {
    setDialog(() => {
      return {
        ...dialog,
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

          {props.children}
        </div>
      </div>
    </>
  );
};
