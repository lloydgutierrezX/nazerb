import { IAction } from "Components/field/IForm";
import { useContext } from "react"
import { createContext } from "react"

export type IConfirmDialogContent = {
  open: boolean,
  module: string;
  // callback function, this may have other value in the future.
  action?: IAction;
  // this is needed for the callback function for sending api request
  id?: string;
  confirmAction?: boolean;
}

type IConfirmDialogContext = {
  confirmDialog: IConfirmDialogContent,
  setConfirmDialog: React.Dispatch<React.SetStateAction<IConfirmDialogContent>>
}

export const ConfirmDialogContext = createContext<IConfirmDialogContext | undefined>(undefined);

export function useConfirmDialogContext() {
  const context = useContext(ConfirmDialogContext);
  if (context === undefined) {
    throw new Error('useConfirmDialogContext must be used with a ConfirmDialogContext');
  }

  return context;
}