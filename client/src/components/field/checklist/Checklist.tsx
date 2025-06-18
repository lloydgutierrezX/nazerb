import {
  UseFormRegister,
  UseFormSetValue,
  useWatch,
  Control,
} from "react-hook-form";
import { IBaseFormGroupField, ICheckListField, IOptions } from "../IForm";
import { useEffect } from "react";

type IChecklistProps = {
  register: UseFormRegister<Record<string, unknown>>;
  formField: IBaseFormGroupField;
  error: string;
  control: Control<Record<string, unknown>>;
  setValue: UseFormSetValue<Record<string, unknown>>;
};

export const Checklist: React.FC<IChecklistProps> = ({
  register,
  control,
  formField,
  setValue,
  error,
}) => {
  const { name, label, className, field } = formField;
  const checklists = useWatch({ control, name }) as IOptions[]; // type assertion
  const parent = (field as ICheckListField).parent;

  useEffect(() => {
    const parentCheckList = checklists
      .filter((cl) => !!cl.defaultChecked)
      .map((cl: { key: string }) => ({
        [parent.key]: parseInt(cl.key),
      }));
    setValue(parent.name, parentCheckList);
  }, [checklists, parent.key, parent.name, setValue]);

  const handleOnChange = (key: string, checked: boolean) => {
    const updated = checklists.map((item) =>
      item.key === key
        ? {
            ...item,
            defaultChecked: checked,
          }
        : item
    );

    // Update's the checklist
    setValue(name, updated);

    // Update's the parent/target field.
    setValue(
      parent.name,
      updated.map((item) => {
        return item.defaultChecked
          ? {
              [parent.key]: item.key,
            }
          : false;
      })
    );
  };

  return (
    <div className={`${className}`}>
      {checklists.map((cl, idx) => {
        return (
          <label
            key={`checklist-${cl.key}`}
            className={`label ${label?.className} ${
              cl.isHidden ? "hidden" : ""
            }`}
          >
            <input
              {...register(`${name}.${idx} as const`)}
              type="checkbox"
              onChange={(e) => handleOnChange(cl.key, e.target.checked)}
              defaultChecked={cl.defaultChecked ?? false}
            />
            {cl.value}
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
