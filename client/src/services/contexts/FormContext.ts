import { createContext, useContext } from "react";
import { DynamicObject } from "Utils/globalInterface";

export type IFormActions = {
  data?: DynamicObject[];
  onAddFn: (data: unknown) => Promise<unknown>;
  onEditFn?: (data: unknown) => Promise<unknown>;
  onDeleteFn?: (data: unknown) => Promise<unknown>;
}

export const FormContext = createContext<IFormActions | undefined>(undefined);

export function useFormContext() {
  alert();
  const context = useContext(FormContext);
  console.log(context)

  if (context === undefined) {
    throw new Error('useFormContext must be used with a FormContext');
  }

  return context;
}