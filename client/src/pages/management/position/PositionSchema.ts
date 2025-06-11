
import { z } from "zod";
export const positionSchema = z.object({
  active: z.coerce.boolean(),
  name: z.string().min(4).max(60),
  description: z.string().max(255).nullable(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
});

export type IPosition = z.infer<typeof positionSchema>;
