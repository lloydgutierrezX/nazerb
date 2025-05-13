import { UseFormRegister } from "react-hook-form";
import React from "react";

type IInputProps = {
  name: string;
  type: "text" | "number";
  className: string;
  containerClassName: string;
  placeholder?: string;
  label?: string;
  labelClassName?: string;
  register: UseFormRegister<Record<string, unknown>>;
};

export const Input: React.FC<IInputProps> = ({
  name,
  type,
  className,
  containerClassName,
  placeholder,
  label,
  labelClassName,
  register,
}) => {
  return (
    <div className={`${containerClassName}`}>
      {label && <label className={`label ${labelClassName}`}>{label}</label>}
      <input
        {...register(name)}
        name={name}
        type={type}
        className={className}
        placeholder={placeholder}
      />
    </div>
  );
};
