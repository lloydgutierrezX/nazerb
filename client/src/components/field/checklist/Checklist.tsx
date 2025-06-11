import {
  useFieldArray,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { IBaseFormGroupField, ICheckListField, IOptions } from "../IForm";
import { useEffect, useState } from "react";
// import { useEffect, useState } from "react";

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
  const fieldArray = useFieldArray({
    name: formField.name,
    control,
  });

  console.log("Field Array:", fieldArray.fields);

  const { name, label, className, field } = formField;
  const { checklist, parent } = field as ICheckListField;

  const [checkFields, setCheckFields] = useState<IOptions[]>([]);

  useEffect(() => {
    return setCheckFields(defaultValues || []);
  }, [defaultValues]);

  const handleOnChange = (checked: boolean, value: number) => {
    console.log(checked, value, getValues());
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
    // setValue(name, { permissionId: checked });
    // console.log("Updated CheckFields:", checkFields);
    // console.log("Updated Value:", getValues(name));
  };

  const isChecked = (key: string) => {
    return (
      checkFields.some((item) => {
        return item.key === key && item.defaultChecked === true;
      }) ?? false
    );
  };

  return (
    <div className={`${className}`}>
      {checklist.map((cl) => {
        console.log("Checklist Item:", name, cl);
        return (
          <label
            key={`checklist-${cl.key}`}
            className={`label ${label?.className} ${
              cl.isHidden ? "hidden" : ""
            }`}
          >
            <input
              {...register(name)}
              type="checkbox"
              onChange={(e) =>
                handleOnChange(
                  (e.target as HTMLInputElement).checked,
                  parseInt(cl.key)
                )
              }
              defaultChecked={isChecked(cl.key)}
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
