import { UseFormRegister } from "react-hook-form";
import React from "react";
import { IBaseFormGroupField, IInputField } from "../IForm";
import { Icon } from "Components/icon/Icon";
import { DynamicObject } from "Utils/globalInterface";

const labelType = (type: string) => {
  switch (type) {
    case "email":
      return <Icon icon="mail" classNames="" />;
    case "password":
      return <Icon icon="key-round" classNames="" />;
    case "tel":
      return <Icon icon="smartphone" classNames="" />;
    case "url":
      return "Path";
    case "username":
      return <Icon icon="user" classNames="" />;
    default:
      return "";
  }
};

const getInput = (
  register: UseFormRegister<DynamicObject>,
  inputProps: IInputField,
  name: string
) => <input {...register(name)} {...inputProps} />;

interface IInputProps {
  register: UseFormRegister<DynamicObject>;
  formField: IBaseFormGroupField;
  error?: string;
}

export const Input: React.FC<IInputProps> = ({
  register,
  formField,
  error,
}) => {
  const { name, field, label, className } = formField;

  if (
    !(
      typeof field === "object" &&
      [
        "number",
        "text",
        "password",
        "email",
        "url",
        "date",
        "time",
        "tel",
        "username",
        "checkbox",
      ].includes(field.type)
    )
  ) {
    return null;
  }

  const inputProps = field as IInputField;

  return (
    <>
      <fieldset className={`fieldset ${className}`}>
        {label && (
          <fieldset className={`fieldset-legend ${label.className}`}>
            {label.value}
          </fieldset>
        )}

        {field.type === "checkbox" ? (
          getInput(register, inputProps, name)
        ) : (
          <label className={`input ${field.className}`}>
            {labelType(field.type)}
            {getInput(register, inputProps, name)}
          </label>
        )}
      </fieldset>

      {error && (
        <label className={`error text-red-500 ${formField.error?.className}`}>
          {error}
        </label>
      )}
    </>
  );
};
