type IToast = {
  type: "info" | "error";
  message: string;
};

export const Toast = () => {
  return (
    <div className="toast toast-top toast-end">
      <div className="alert alert-info">
        <span> Sample toast </span>
      </div>
      <div className="alert alert-success"></div>
    </div>
  );
};
