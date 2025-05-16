import { Icon } from "Components/icon/Icon";
import { useConfirmDialogContext } from "Services/contexts/ConfirmDialogContext";

export const ConfirmDialog = () => {
  const { setConfirmDialog, confirmDialog } = useConfirmDialogContext();

  const closeConfirmDialog = () =>
    setConfirmDialog({ ...confirmDialog, open: false });

  const handleOnClick = () =>
    confirmDialog.action === "delete"
      ? confirmDialog.buttons.onDeleteFn(confirmDialog.id as string)
      : confirmDialog.buttons.onRetrieveFn(confirmDialog.id as string);

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
              onClick={() => handleOnClick()}
            >
              Confirm
            </button>

            <button
              className="btn btn-soft btn-error"
              onClick={closeConfirmDialog}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
