import { createContext, useContext } from "react";
import { DynamicObject } from "Utils/globalInterface";

export const FormContext = createContext<DynamicObject | undefined>(undefined);

export function usePageContext() {
  const context = useContext(FormContext);

  if (context === undefined) {
    throw new Error('usePageContext must be used with a PageContext');
  }

  return context;
}