import { Icon } from "Components/icon/Icon";
import { useConfirmDialogContext } from "Services/contexts/ConfirmDialogContext";
import { useFormContext } from "Services/contexts/FormContext";

export const ConfirmDialog = () => {
  const { confirmDialog, setConfirmDialog } = useConfirmDialogContext();
  const { form, setForm } = useFormContext();

  const closeConfirmDialog = () =>
    setConfirmDialog({ ...confirmDialog, confirmAction: false, open: false });

  const handleOnClick = () => {
    setForm({ ...form, action: confirmDialog.action! });
    setConfirmDialog({ ...confirmDialog, confirmAction: true });
  };

  return (
    <>
      <input
        type="checkbox"
        id="confirmDialog"
        className="modal-toggle"
        checked={confirmDialog.open}
        readOnly
      />

      <div className="modal" role="dialog">
        <div className="modal-box flex flex-col gap-4">
          <div className="flex flex-row gap-1">
            <Icon
              icon="triangle-alert"
              classNames="self-center"
              color="orange"
            />
            <h3 className="text-xl font-semibold">
              {`${confirmDialog.module} Confirmation Dialog`}
            </h3>
          </div>
          <div className="flex">
            <p>
              {`Are you sure you want to ${confirmDialog.action} this data?`}
            </p>
          </div>
          <div className="flex flex-row-reverse gap-2">
            <button
              className="btn btn-soft btn-success"
              onClick={handleOnClick}
              disabled={confirmDialog.confirmAction}
              // confirmDialog.confirmAction will not return to false until our mutation is onSuccess.
            >
              {confirmDialog.confirmAction ? "Loading..." : "Confirm"}
            </button>

            <button
              className="btn btn-soft btn-error"
              onClick={closeConfirmDialog}
              disabled={confirmDialog.confirmAction}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
