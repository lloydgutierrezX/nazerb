import {
  Control,
  useFieldArray,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { IBaseFormGroupField } from "../IForm";
import { useEffect, useState } from "react";

type IChecklistProps = {
  register: UseFormRegister<Record<string, unknown>>;
  formField: IBaseFormGroupField;
  error: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue: UseFormSetValue<Record<string, unknown>>;
  getValues: UseFormGetValues<Record<string, unknown>>;
  defaultValues: Record<string, unknown>;
};

export const Checklist: React.FC<IChecklistProps> = ({
  register,
  formField,
  error,
  setValue,
  getValues,
}) => {
  const { name, label, className, field } = formField;
  const [checklists, setChecklists] = useState<{ [key: string]: number }[]>([]);

  const data = getValues()[name];

  useEffect(() => {
    if (field.type !== "checklist" || !("key" in field)) return;
    if (!Array.isArray(data)) return;

    const filtered = data.filter(
      (d) => !isNaN(parseInt(d[field.key])) && typeof [field.key] === "number"
    );
    setChecklists(filtered);
  }, [data, field, field.type, getValues, name]);
  const { checklist, key } = field;

  const handleOnClick = (checked: boolean, value: number) => {
    console.log(checked, value);
    console.log(checklists);
  };

  return (
    <div className={`${className}`}>
      {checklist.map((checklist, idx) => {
        return (
          <label
            key={`checklist-${checklist.key}`}
            className={`label ${label?.className} ${
              checklist.isHidden ? "hidden" : ""
            }`}
          >
            <input
              {...register(`${name}.${idx}.${key}`)}
              type="checkbox"
              onClick={(e) =>
                handleOnClick(
                  (e.target as HTMLInputElement).checked,
                  parseInt(checklist.key)
                )
              }
            />
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
