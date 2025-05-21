/* eslint-disable react-hooks/exhaustive-deps */
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./input/Input";
import { z } from "zod";
import { Toggle } from "./toggle/Toggle";
import { IFormField, IFormProps } from "./IForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDialogContext } from "Services/contexts/DialogContext";
import { TextArea } from "./textarea/TextArea";
import { useFormContext } from "Services/contexts/FormContext";
import { DynamicObject } from "Utils/globalInterface";
import { useConfirmDialogContext } from "Services/contexts/ConfirmDialogContext";

export const Form: React.FC<IFormProps> = ({
  schema,
  formFields,
  moduleName,
  data,
}) => {
  const { dialog, setDialog } = useDialogContext();
  const { confirmDialog, setConfirmDialog } = useConfirmDialogContext();
  const { form, setForm } = useFormContext();

  // useForm init
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
    reset,
  } = useForm<z.infer<typeof schema> & Record<string, unknown>>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: zodResolver(schema),
  });

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
          console.log("delet");
          return (
            confirmDialog?.id && form.onDeleteFn(confirmDialog.id as string)
          );
        case "retrieve":
          console.log("retreive");
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
  });

  // useEffect for field validation
  useEffect(() => {
    // if we close the dialog, then we need to reset the fields.
    if (!dialog.open) {
      reset();
      return;
    }

    formFields.forEach((f) => {
      const d = data as Record<string, unknown>;
      // if data has value, meaning the form is called for update
      // then we need to manually set the value to each field.
      if (data) {
        setValue(f.name, d[f.name]);
        return;
      }

      // if the process goes here, then meaning this is form is for create.
      // if the current field is a toggle, we need to set it's value to true.
      // empty string or "" if its not a toggle.
      const isBoolean = f.type === "toggle";
      setValue(f.name, isBoolean ? true : "");
    });
  }, [dialog.open, data, formFields, setValue]);

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

  const onSubmit: SubmitHandler<
    z.infer<typeof schema> & Record<string, unknown>
  > = (formData) => mutation.mutate(formData);

  // for Server response, if has error. We dynamically set this error on react-table
  useEffect(() => {
    const errors = mutation.error as unknown as {
      fields: string[];
      message: string;
    };

    if (!errors?.fields) return;

    errors.fields.map((fieldName) =>
      setError(fieldName, { type: "manual", message: errors.message })
    );
    return;
  }, [mutation.error]);

  const showError = (name: string) => {
    if (!errors[name]) {
      return "";
    }

    return <p className="label text-red-500 my-2">{errors[name]?.message}</p>;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <fieldset className="fieldset border-base-300 rounded-box w-full border p-4">
        <legend className="fieldset-legend text-xl">
          {(form.action === "create" ? "Create" : "Update") + " " + moduleName}
        </legend>

        {formFields.map((field: IFormField) => {
          field.className += errors[field.name]
            ? "color-red-500 border-red-500 focus:outline-red-500"
            : "border-transparent outline-[#222222] focus:outline-[#222222]";

          switch (field.type) {
            case "text":
              return (
                <div key={field.name} className="my-2">
                  <Input
                    register={register}
                    name={field.name}
                    type={field.type}
                    label={field?.label}
                    labelClassName={`label ${field.labelClassName}`}
                    className={`input w-full outline focus:outline focus:border-transparent ${field.className}`}
                    containerClassName="flex flex-col gap-2"
                  />
                  {showError(field.name)}
                </div>
              );

            case "toggle":
              return (
                <div
                  key={field.name}
                  className={`my-2 ${field.containerClassName}`}
                >
                  <Toggle
                    register={register}
                    name={field.name}
                    className={field.className}
                    label={field?.label}
                    labelClassName={`label ${field.labelClassName}`}
                    formFields={formFields}
                  />

                  {showError(field.name)}
                </div>
              );

            case "textarea":
              return (
                <div
                  key={field.name}
                  className={`my-2 ${field.containerClassName}`}
                >
                  <TextArea
                    register={register}
                    name={field.name}
                    label={field?.label}
                    labelClassName={`label ${field.labelClassName}`}
                    className={`input w-full outline focus:outline focus:border-transparent ${field.className}`}
                    containerClassName="flex flex-col gap-2"
                    type={field.type}
                  />

                  {showError(field.name)}
                </div>
              );
            default:
              return null;
          }
        })}
      </fieldset>

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
