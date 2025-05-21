import { useState } from "react";
import { UseFormRegister } from "react-hook-form";

export const Checkbox = (props: {
  name: string;
  register: UseFormRegister<Record<string, unknown>>;
  defaultChecked: boolean;
  label?: string;
  className?: string;
  labelClassName?: string;
  value?: boolean;
  placeholder?: string;
  fieldset?: string;
}) => {
  const [value, setValue] = useState(props.value === true);

  return (
    <>
      {props.label && <label className="label">{props.label}</label>}

      <input
        {...props.register(props.name)}
        name={props.name}
        type="checkbox"
        defaultChecked={props.defaultChecked}
        className={`checkbox ${props.labelClassName}`}
        checked={value}
        onClick={() => setValue((prev) => !prev)}
      />
    </>
  );
};
