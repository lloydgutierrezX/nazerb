import { createContext, useContext } from "react";
import { DynamicObject } from "Utils/globalInterface";

export type IDialogContent = {
  open: boolean;
  module?: string;
  data?: DynamicObject;
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