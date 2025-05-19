import { UseFormRegister } from "react-hook-form";
import { IFormField } from "Components/field/IForm";

type IToggleProps = {
  name: string;
  formFields: IFormField[];
  label?: string;
  labelClassName?: string;
  className?: string;
  placeholder?: string;
  register: UseFormRegister<Record<string, unknown>>;
};

export const Toggle: React.FC<IToggleProps> = ({
  name,
  label,
  labelClassName,
  className,
  register,
}) => {
  return (
    <>
      <label className={`label ${labelClassName}`}> {label} </label>
      <div className={`${className}`}>
        <input {...register(name)} type="checkbox" className="toggle" />
      </div>
    </>
  );
};
