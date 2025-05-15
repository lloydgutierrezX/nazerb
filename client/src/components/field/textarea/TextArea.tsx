import { UseFormRegister } from "react-hook-form";
import { ITextAreaField } from "../IFormFields";

interface ITextAreaProps extends ITextAreaField {
  register: UseFormRegister<Record<string, unknown>>;
}

export const TextArea: React.FC<ITextAreaProps> = ({
  name,
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
      <textarea
        {...register(name)}
        name={name}
        className={`textarea ${className}`}
        placeholder={placeholder}
      />
    </div>
  );
};
