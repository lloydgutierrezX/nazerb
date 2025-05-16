/* eslint-disable react-hooks/exhaustive-deps */
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./input/Input";
import { z } from "zod";
import { Toggle } from "./toggle/Toggle";
import { IFormField, IFormProps } from "./IFormFields";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDialogContext } from "Services/contexts/DialogContext";
import { TextArea } from "./textarea/TextArea";

export const Form: React.FC<IFormProps> = ({
  schema,
  formFields,
  moduleName,
  data,
  onAddFn,
  onUpdateFn,
}) => {
  const isCreate = !data;
  const { dialog, setDialog } = useDialogContext();

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

  const onSubmit: SubmitHandler<
    z.infer<typeof schema> & Record<string, unknown>
  > = (formData) => mutation.mutate(formData);

  useEffect(() => {
    if (!dialog.open) {
      reset();
      return;
    }

    formFields.forEach((f) => {
      const d = data as Record<string, unknown>;
      if (data) {
        setValue(f.name, d[f.name]);
        return;
      }

      const isBoolean = f.type === "toggle";

      setValue(f.name, isBoolean ? true : "");
    });
  }, [dialog.open, data, formFields, setValue]);

  // react-query function for Add, Edit, Delete
  const mutation = useMutation({
    mutationFn: async (formData: Record<string, unknown>) =>
      isCreate ? onAddFn(formData) : onUpdateFn(data.id as string, formData),
  });

  useEffect(() => {
    if (mutation.isSuccess)
      setDialog(() => {
        return { ...dialog, hasChanges: true, open: false };
      });
  }, [mutation.isSuccess]);

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
          {(isCreate ? "Create" : "Update") + " " + moduleName}
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
export type { IFormField };
