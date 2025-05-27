import { UseFormRegister } from "react-hook-form";
import { IBaseFormGroupField, IOptions } from "../IForm";

type IChecklistProps = {
  register: UseFormRegister<Record<string, unknown>>;
  formField: IBaseFormGroupField;
  error: string;
};

export const Checklist: React.FC<IChecklistProps> = ({
  register,
  formField,
  error,
}) => {
  const { name, field, label, className } = formField;
  if (field.type !== "checklist") return null;

  return (
    <div className={`${className}`}>
      {field.checklist.map((checklist: IOptions) => {
        return (
          <label key={checklist.key} className={`label ${label?.className}`}>
            <input {...register(name)} type="checkbox" />
            {checklist.value}
          </label>
        );
      })}
      {error && (
        <label className={`error text-red-500 ${formField.error?.className}`}>
          {error}
        </label>
      )}
    </div>
  );
};
