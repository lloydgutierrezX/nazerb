import { createContext, useContext } from "react";

type IDialogContent = {
  open: boolean;
  module?: string;
}

export type IDialogContext = {
  dialog: IDialogContent;
  setDialog: React.Dispatch<React.SetStateAction<IDialogContent>>
}

export const DialogContext = createContext<IDialogContext | undefined>(undefined);

export function useDialogContext() {
  const dialogContext = useContext(DialogContext);

  if (dialogContext === undefined) {
    throw new Error('usePageContext must be used with a PageContext');
  }

  return dialogContext;
}

export type IHandleDialog = {
  action: string;
  toggle: boolean;
}