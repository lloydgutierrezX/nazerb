import { UseFormRegister } from "react-hook-form";
import { IBaseFormGroupField } from "../IForm";

interface ISelect extends React.SelectHTMLAttributes<HTMLSelectElement> {
  register: UseFormRegister<Record<string, unknown>>;
  formField: IBaseFormGroupField;
  error: string;
}

export const Select: React.FC<ISelect> = ({ register, formField, error }) => {
  const { name, field, label, className, excludeDisabledOption, includeAll } =
    formField;

  if (field.type !== "select") return null;
  return (
    <>
      <fieldset className={`fieldset ${className}`}>
        {label && (
          <legend className={`fieldset-legend ${label.className}`}>
            {label.value}
          </legend>
        )}

        <select {...register(name)} {...field} className={field.className}>
          {!excludeDisabledOption && (
            <option value="-1" disabled>
              {field.placeholder ?? "Select an option"}
            </option>
          )}
          {includeAll && <option value="all"> All filters </option>}

          {field.options.map((option, idx) => (
            <option key={`${option.key}-${idx}`} value={option.key}>
              {option.value}
            </option>
          ))}
        </select>
      </fieldset>

      {error && (
        <label className={`error text-red-500 ${formField.error?.className}`}>
          {error}
        </label>
      )}
    </>
  );
};
