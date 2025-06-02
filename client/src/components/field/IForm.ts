interface IFormGroupLabel extends React.LabelHTMLAttributes<HTMLLabelElement> {
  value?: string;
  className: string;
}

export type IFieldType = IInputField | IToggleField | ITextAreaField | ISelectField | ICheckListField;

export interface IBaseFormGroupField {
  name: string;
  field: IFieldType;
  error?: IFormGroupLabel;
  label?: IFormGroupLabel;
  className?: string;
  // for select fields
  includeAll?: boolean;
  excludeDisabledOption?: boolean;
};

export interface IInputField extends React.InputHTMLAttributes<HTMLInputElement> {
  type: "text" | "number" | "password" | "email" | "date" | "checkbox" | "radio" | "url" | "time" | "tel" | "username";
}

interface ITextAreaField extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  type: "textarea";
}

export type IOptions = {
  key: string;
  value: string | number;
  className?: string;
  isHidden?: boolean;
};

interface ISelectField extends React.SelectHTMLAttributes<HTMLSelectElement> {
  type: "select";
  options: IOptions[];
  placeholder: string;
  includeAll?: boolean;
  excludeDisabledOption?: boolean;
  defaultValue?: string;
}

export type IToggleField = {
  type: "toggle",
  className?: string;
  placeholder?: string;
  defaultChecked?: boolean;
}

export type ICheckListField = {
  type: 'checklist',
  className: string;
  key: string;
  checklist: IOptions[];
}

export type IAction = 'create' | 'update' | 'delete' | 'retrieve';