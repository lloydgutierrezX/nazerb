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
  className?: string;
  containerClassName?: string;
  placeholder?: string;
  label?: string;
  labelClassName?: string;

};

export interface IInputField extends IBaseFormField {
  type: "text" | "number";
}

export interface ITextAreaField extends IBaseFormField {
  type: "textarea";
}

interface IToggleField extends IBaseFormField {
  type: "toggle"
  defaultChecked?: boolean;
}

export type IFormField = IInputField | IToggleField | ITextAreaField;


