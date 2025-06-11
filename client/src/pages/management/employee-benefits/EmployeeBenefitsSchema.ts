
import { z } from "zod";
export const employeeBenefitsSchema = z.object({
  active: z.coerce.boolean(),
  name: z.string().min(4).max(60),
  description: z.string().max(255).nullable(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
});

export type IEmployeeBenefits = z.infer<typeof employeeBenefitsSchema>;
