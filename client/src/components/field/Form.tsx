import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./input/Input";
import { z, ZodType } from "zod";
import { Toggle } from "./toggle/Toggle";
import { IFormField } from "./IFormFields";
import { DynamicObject } from "Utils/globalInterface";

type IFormProps = {
  schema: ZodType<Record<string, unknown>>;
  formFields: IFormField[];
  moduleName: string;
  data?: DynamicObject;
};

export const Form: React.FC<IFormProps> = ({
  schema,
  formFields,
  moduleName,
  data,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof schema> & Record<string, unknown>>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<
    z.infer<typeof schema> & Record<string, unknown>
  > = (data) => {
    console.log(data, errors);

    // try {
    //   await new Promise((resolve) => setTimeout(resolve, 1000));
    //   throw new Error();
    // } catch {
    //   setError("name", {
    //     message: "Name is a name....",
    //   });
    //   console.log(errors);
    //   console.log(data);
    // }
  };

  const showError = (name: string) => {
    if (!errors.name) {
      return "";
    }

    return <p className="label text-red-500">{errors[name]?.message}</p>;
  };

  const isCreate = !data;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <fieldset className="fieldset border-base-300 rounded-box w-full border p-4">
        <legend className="fieldset-legend text-xl">
          {(isCreate ? "Create" : "Update") + " " + moduleName}
        </legend>

        {formFields.map((field: IFormField) => {
          field.className += errors[field.name]
            ? "color-red-500 border-red-500 focus:outline-red-500"
            : "outline-[#222222] focus:outline-[#222222]";

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
                    className={`input w-full outline focus:outline focus:border-none ${field.className}`}
                    containerClassName="flex flex-col gap-2"
                  />
                  {showError(field.name)}
                </div>
              );

            case "toggle":
              if (field.name === "is_active" && isCreate) {
                return "";
              }

              return (
                <div
                  key={field.name}
                  className={`my-2 ${field.containerClassName}`}
                >
                  <Toggle
                    register={register}
                    name={field.name}
                    defaultChecked={field?.defaultChecked ?? false}
                    className={field.className}
                    label={field?.label}
                    labelClassName={`label ${field.labelClassName}`}
                    formFields={formFields}
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
          disabled={isSubmitting}
        >
          {isSubmitting ? "Loading..." : "Submit"}
        </button>
      </div>
    </form>
  );
};
export type { IFormField };
