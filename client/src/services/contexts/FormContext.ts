import { AxiosResponse } from "axios";
import { IAction } from "Components/field/IForm";
import { useContext } from "react"
import { createContext } from "react"
import { DynamicObject } from "Utils/globalInterface";

export type IForm = {
  url: string;
  fetchQueryKey: string;
  action: IAction;
  onAddFn: (
    data: DynamicObject
  ) => Promise<AxiosResponse<unknown, unknown>>;
  onUpdateFn: (
    id: string,
    data: DynamicObject
  ) => Promise<AxiosResponse<unknown, unknown>>;
  onDeleteFn: (id: string) => Promise<AxiosResponse<unknown, unknown>>,
  onRetrieveFn: (id: string) => Promise<AxiosResponse<unknown, unknown>>,
  defaultValues?: DynamicObject;
}

type IFormContext = {
  form: IForm,
  setForm: React.Dispatch<React.SetStateAction<IForm>>
}

export const FormContext = createContext<IFormContext | undefined>(undefined);

export function useFormContext() {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error('useFormContext must be used with a FormContext');
  }

  return context;
}