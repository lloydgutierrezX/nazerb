import { UseFormRegister } from "react-hook-form";
import { IBaseFormGroupField } from "../IForm";

interface ITextAreaProps {
  register: UseFormRegister<Record<string, unknown>>;
  formField: IBaseFormGroupField;
  error: string;
}

export const TextArea: React.FC<ITextAreaProps> = ({
  register,
  formField,
  error,
}) => {
  const { name, field, label } = formField;

  field.className += field.className?.includes("textarea") ? "" : " textarea";

  return (
    <>
      <fieldset className="fieldset">
        <legend className={`fieldset-legend ${label?.className}`}>
          {label?.value}
        </legend>
        <textarea
          {...register(name as `${string}`)}
          {...(field as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      </fieldset>

      {error && (
        <label className={`error text-red-500 ${formField.error?.className}`}>
          {error}
        </label>
      )}
    </>
  );
};
