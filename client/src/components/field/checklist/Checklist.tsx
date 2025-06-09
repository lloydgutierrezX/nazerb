import {
  Control,
  useFieldArray,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { IBaseFormGroupField, ICheckListField, IFieldType } from "../IForm";
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

type ICheckField = { [key: string]: number };

export const Checklist: React.FC<IChecklistProps> = ({
  register,
  formField,
  error,
  setValue,
  getValues,
}) => {
  const { name, label, className, field } = formField;
  const { checklist, parent } = field as ICheckListField;
  console.log(getValues());

  // useEffect(() => {
  //   console.log(checklist);
  //   setValue(name, checklist.map());
  //   setCheckFields(
  //     checklist.map((item) => {
  //       console.log("Item", item);
  //       return {
  //         [parent.key]: parseInt(item.key),
  //       };
  //     })
  //   );
  // }, [checklist, parent.key]);

  const handleOnChange = (checked: boolean, value: number) => {
    // console.log(checked, checkFields);
    // setCheckFields((prev: ICheckField[]) => {
    //   const updated = [...prev];
    //   if (checked) {
    //     updated.push({ [key]: value });
    //   } else {
    //     const index = updated.findIndex((item) => item[key] === value);
    //     console.log("Index", index);
    //     if (index !== -1) {
    //       updated.splice(index, 1);
    //     }
    //   }
    //   return updated;
    // });
    setValue(name, { permissionId: checked });
    console.log(getValues());
    // console.log("Updated CheckFields:", checkFields);
    // console.log("Updated Value:", getValues(name));
  };

  const isChecked = (id: string) => {
    return parseInt(id);
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
              {...register(`${name}.${idx}.${parent.key}`)}
              type="checkbox"
              onChange={(e) =>
                handleOnChange(
                  (e.target as HTMLInputElement).checked,
                  parseInt(checklist.key)
                )
              }
              defaultChecked={isChecked(checklist.key)}
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
