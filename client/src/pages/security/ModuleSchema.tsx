import { z } from "zod";

export const moduleSchema = z.object({
  name: z.string().min(4).max(60),
  is_active: z.boolean(),
  created_at: z.date().nullish(),
  updated_at: z.date().nullish(),
});

export type IModule = z.infer<typeof moduleSchema>;
