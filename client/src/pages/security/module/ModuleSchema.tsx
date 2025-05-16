import { z } from "zod";

export const moduleSchema = z.object({
  name: z.string().min(4).max(60).default(""),
  description: z.string().nullable().default(null),
  active: z.boolean().default(true),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
});

export type IModule = z.infer<typeof moduleSchema>;
