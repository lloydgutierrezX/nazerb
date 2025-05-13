import { UseFormRegister } from "react-hook-form";
import { IFormField } from "../IFormFields";

type IToggleProps = {
  name: string;
  defaultChecked: boolean;
  formFields: IFormField[];
  label?: string;
  labelClassName?: string;
  className?: string;
  placeholder?: string;
  register: UseFormRegister<Record<string, unknown>>;
};

export const Toggle: React.FC<IToggleProps> = ({
  name,
  defaultChecked,
  label,
  labelClassName,
  className,
  register,
}) => {
  return (
    <>
      <label className={`label ${labelClassName}`}> {label} </label>
      <div className={`${className}`}>
        <input
          {...register(name)}
          type="checkbox"
          defaultChecked={defaultChecked}
          className="toggle"
        />
      </div>
    </>
  );
};
