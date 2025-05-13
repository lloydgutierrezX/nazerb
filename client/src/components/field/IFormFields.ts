export type IDynamicFormFieldValidation = {
  [key: string]: string | number | boolean;
}

interface IBaseFormField {
  name: string;
  placeholder?: string;
  className?: string;
  label?: string;
  labelClassName?: string;
  containerClassName?: string;
  validations: IDynamicFormFieldValidation
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