import { z } from "zod";
export const BenefitSchema = z.object({
  active: z.coerce.boolean(),
  name: z.string().min(3).max(60),
  description: z.string().max(255).nullable(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
});

export type IBenefit = z.infer<typeof BenefitSchema>;