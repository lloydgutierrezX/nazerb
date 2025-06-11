/* eslint-disable react-hooks/exhaustive-deps */
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./input/Input";
import { z, ZodType } from "zod";
import { IBaseFormGroupField, ICheckListField, IOptions } from "./IForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ReactNode, useEffect, useState } from "react";
import { useDialogContext } from "Services/contexts/DialogContext";
import { TextArea } from "./textarea/TextArea";
import { useFormContext } from "Services/contexts/FormContext";
import { DynamicObject } from "Utils/globalInterface";
import { useConfirmDialogContext } from "Services/contexts/ConfirmDialogContext";
import { Select } from "./select/Select";
import { Checklist } from "./checklist/Checklist";

type IFormGroupProps = {
  schema: ZodType<Record<string, unknown>>;
  formFields: IBaseFormGroupField[];
  moduleName: string;
  data?: Record<string, unknown>;
  children?: ReactNode;
  defaultValues?: Record<string, unknown>;
};

export const FormGroup: React.FC<IFormGroupProps> = ({
  schema,
  formFields,
  moduleName,
  data,
  children,
  defaultValues,
}) => {
  const { dialog, setDialog } = useDialogContext();
  const { confirmDialog, setConfirmDialog } = useConfirmDialogContext();
  const { form, setForm } = useFormContext();
  const [customDefaultValues, setCustomDefaultValues] = useState<
    Record<string, unknown>
  >(defaultValues || {});

  // useForm init
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setError,
    setValue,
    getValues,
    reset,
  } = useForm<z.infer<typeof schema> & Record<string, unknown>>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: zodResolver(schema),
    defaultValues,
  });

  // console.log(errors);
  // console.log(defaultValues, getValues());

  const queryClient = useQueryClient();
  // react-query function for Create, Edit, Delete, Retrieve
  const mutation = useMutation({
    mutationFn: async (formData?: Record<string, unknown> | null) => {
      switch (form.action) {
        case "create":
          return form.onAddFn(formData as DynamicObject);
        case "update":
          return (
            data?.id &&
            form.onUpdateFn(data.id as string, formData as DynamicObject)
          );
        case "delete":
          return (
            confirmDialog?.id && form.onDeleteFn(confirmDialog.id as string)
          );
        case "retrieve":
          return (
            confirmDialog?.id && form.onRetrieveFn(confirmDialog.id as string)
          );
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [form.fetchQueryKey] });

      // resets dialog and confirm dialog context params
      setDialog((prev) => ({ ...prev, data: undefined, open: false }));
      setConfirmDialog((prev) => ({
        ...prev,
        confirmAction: false,
        open: false,
      }));
      setForm((prev) => ({ ...prev, action: "create" }));
    },
    onError: (error: { fields?: string[]; error?: string }) => {
      if (!error.fields || !error.error) {
        return;
      }

      // setting manual error per field
      error.fields.map((fieldName) =>
        setError(fieldName, { type: "manual", message: error.error })
      );
    },
  });

  const onSubmit: SubmitHandler<
    z.infer<typeof schema> & Record<string, unknown>
  > = (formData) => {
    mutation.mutate(formData);
  };

  // useEffect for confirmation dialog. this is for Delete and Retrieve actions.
  useEffect(() => {
    if (
      !confirmDialog.confirmAction ||
      (form.action !== "retrieve" && form.action !== "delete")
    ) {
      return;
    }

    mutation.mutate(null);
  }, [confirmDialog.confirmAction, form.action]);

  // useData for onload
  useEffect(() => {
    // if we close the dialog, then we need to reset the fields.
    if (!dialog.open) {
      setCustomDefaultValues({});
      reset();
      return;
    }

    formFields.forEach((f) => {
      const d = data as Record<string, unknown>;
      // if data has value, meaning the form is called for update
      // else, this is for create. we need to implement the default value
      if (data) {
        if (
          f.field.type === "checklist" &&
          (f.field as ICheckListField).parent
        ) {
          const { name, key } = (f.field as ICheckListField).parent;
          const checklists = f.field.checklist.map((cl) => ({
            ...cl,
            defaultChecked:
              Array.isArray(d[name]) &&
              (d[name] as Array<{ [x: string]: number }>).some(
                (item: { [x: string]: number }) => {
                  return item[key] === parseInt(cl.key);
                }
              ),
          }));
          setValue(f.name, checklists);
          console.log(getValues());
          // setCustomDefaultValues((prev) => ({
          //   ...prev,
          //   [f.name]: checklists,
          // }));
        } else {
          setValue(f.name, d[f.name]);
        }
        return;
      }

      if (customDefaultValues?.[f.name]) {
        setValue(f.name, customDefaultValues?.[f.name]);
        return;
      }

      // if the process goes here, then meaning this is form is for create.
      // if the current field is a toggle, we need to set it's value to true.
      // empty string or "" if its not a toggle.
      const isBoolean = f.field.type === "checkbox";
      setValue(f.name, isBoolean ? true : "");
    });
  }, [dialog.open]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <fieldset className="fieldset border-base-300 rounded-box w-full border p-4">
        <legend className="fieldset-legend text-xl">
          {(form.action === "create" ? "Create" : "Update") + " " + moduleName}
        </legend>

        {formFields.map((fg: IBaseFormGroupField) => {
          switch (fg.field.type) {
            case "number":
            case "text":
            case "password":
            case "email":
            case "url":
            case "date":
            case "time":
            case "tel":
            case "username":
            case "checkbox":
              return (
                <div key={fg.name}>
                  <Input
                    register={register}
                    formField={fg}
                    error={errors[fg.name]?.message ?? ""}
                  />
                </div>
              );

            case "textarea":
              return (
                <div key={`${fg.name}-containter`}>
                  <TextArea
                    key={fg.name}
                    register={register}
                    formField={fg}
                    error={errors[fg.name]?.message ?? ""}
                  />
                </div>
              );

            case "select":
              return (
                <div key={`${fg.name}-containter`}>
                  <Select
                    key={fg.name}
                    register={register}
                    formField={fg}
                    error={errors[fg.name]?.message ?? ""}
                  />
                </div>
              );

            case "checklist":
              return (
                <div key={`${fg.name}-containter`}>
                  <Checklist
                    key={fg.name}
                    register={register}
                    setValue={setValue}
                    formField={fg}
                    getValues={getValues}
                    control={control}
                    defaultValues={
                      Array.isArray(customDefaultValues?.[fg.name])
                        ? (customDefaultValues![fg.name] as IOptions[])
                        : []
                    }
                    error={errors[fg.name]?.message ?? ""}
                  />
                </div>
              );

            default:
              return null;
          }
        })}
      </fieldset>

      {children}

      <div className="flex justify-end">
        <button
          type="submit"
          className="btn btn-primary mt-4 w-1/4"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Loading..." : "Submit"}
        </button>
      </div>
    </form>
  );
};
