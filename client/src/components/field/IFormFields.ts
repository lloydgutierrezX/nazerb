import { AxiosResponse } from "axios";
import { ZodType } from "zod";

export type IFormProps = {
  schema: ZodType<Record<string, unknown>>;
  formFields: IFormField[];
  moduleName: string;
  apiUrl: string;
  data?: Record<string, unknown>;
  onAddFn: (
    url: string,
    data: unknown
  ) => Promise<AxiosResponse<unknown, unknown>>;
  onUpdateFn: (
    url: string,
    data: unknown
  ) => Promise<AxiosResponse<unknown, unknown>>;
};

interface IBaseFormField {
  name: string;
  placeholder?: string;
  className?: string;
  label?: string;
  labelClassName?: string;
  containerClassName?: string;
};

interface IInputField extends IBaseFormField {
  type: "text" | "number";
  value?: string;
}

interface IToggleField extends IBaseFormField {
  type: "toggle"
  value: true;
  defaultChecked?: boolean;
}

export type IFormField = IInputField | IToggleField;