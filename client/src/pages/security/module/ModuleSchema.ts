
import { z } from "zod";
export const moduleSchema = z.object({
  active: z.coerce.boolean(),
  name: z.string().min(4).max(60),
  link: z.string().min(1).max(120),
  description: z.string().nullable(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
});

export type IModule = z.infer<typeof moduleSchema>;
