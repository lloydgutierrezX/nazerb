import { z } from "zod";

export const moduleSchema = z.object({
  name: z.string().min(4).max(60),
  active: z.boolean(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
});

export type IModule = z.infer<typeof moduleSchema>;
