import { AxiosResponse } from "axios";
import { useContext } from "react"
import { createContext } from "react"

export type IConfirmDialogContent = {
  open: boolean,
  module: string;
  id?: string;
  action?: 'delete' | 'retreive';
  buttons: {
    [key: string]: (id: string) => Promise<AxiosResponse<unknown, unknown>>;
  }
}

type IConfirmDialogContext = {
  confirmDialog: IConfirmDialogContent,
  setConfirmDialog: React.Dispatch<React.SetStateAction<IConfirmDialogContent>>
}

export const ConfirmDialogContext = createContext<IConfirmDialogContext | undefined>(undefined);

export function useConfirmDialogContext() {
  const context = useContext(ConfirmDialogContext);

  console.log(context)
  if (context === undefined) {
    throw new Error('useConfirmDialogContext must be used with a ConfirmDialogContext');
  }

  return context;
}