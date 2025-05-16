import { createContext, useContext } from "react";

export type IDialogContent = {
  open: boolean;
  module?: string;
  hasChanges?: boolean;
  data?: Record<string, unknown>;
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