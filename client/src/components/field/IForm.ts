interface IFormGroupLabel extends React.LabelHTMLAttributes<HTMLLabelElement> {
  value?: string;
  className: string;
}

export type IFieldType = IInputField | IToggleField | ITextAreaField | ISelectField;

export interface IBaseFormGroupField {
  name: string;
  field: IFieldType;
  error?: IFormGroupLabel;
  label?: IFormGroupLabel;
  className?: string;
};

export interface IInputField extends React.InputHTMLAttributes<HTMLInputElement> {
  type: "text" | "number" | "password" | "email" | "date" | "checkbox" | "radio" | "url" | "time" | "tel" | "username";
}

interface ITextAreaField extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  type: "textarea";
}

type IOptions = {
  key: string;
  value: string | number;
  className: string;
};

interface ISelectField extends React.SelectHTMLAttributes<HTMLSelectElement> {
  type: "select";
  options: IOptions[];
  placeholder: string;
}


export interface IToggleField {
  type: "toggle"
  className?: string;
  placeholder?: string;
  defaultChecked?: boolean;
}

export type IAction = 'create' | 'update' | 'delete' | 'retrieve';