import {
  useFieldArray,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { IBaseFormGroupField, ICheckListField, IOptions } from "../IForm";
import { useEffect, useState } from "react";
// import { useEffect, useState } from "react";

type IFieldArray = {
  id: string;
  value: string | number;
  isChecked: boolean;
};

type IChecklistProps = {
  register: UseFormRegister<Record<string, unknown>>;
  formField: IBaseFormGroupField;
  error: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue: UseFormSetValue<Record<string, unknown>>;
  getValues: UseFormGetValues<Record<string, unknown>>;
  defaultValues: IOptions[] | [];
  control: Record<string, unknown>;
};

type ICheckField = { [key: string]: number };

export const Checklist: React.FC<IChecklistProps> = ({
  register,
  control,
  formField,
  error,
  setValue,
  getValues,
  defaultValues,
}) => {
  console.log("controls", control);
  const { name, label, className, field } = formField;
  const { checklist, parent } = field as ICheckListField;

  console.log(name, control.fields);

  const { fields, append } = useFieldArray({
    name,
    control,
  });

  console.log("fields: ", fields);

  return (
    <div className={`${className}`}>
      {checklist.map((cl, idx) => {
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
              checked={cl.defaultChecked}
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
