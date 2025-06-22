
import { z } from "zod";
export const TaskSchema = z.object({
  active: z.coerce.boolean(),
  name: z.string().min(3).max(60).regex(/^[a-zA-Z0-9 _-]+$/, {
    message: "Only letters, numbers, spaces, underscores (_), and hyphens (-) are allowed",
  }),
  code: z.string().min(3).max(20)
    .regex(/^[A-Z0-9_-]+$/, {
      message: "Code must be uppercase letters, underscores (_), hyphens (-) numbers only, with no spaces",
    }),
  description: z.string().max(255).optional(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
});

export type ITask = z.infer<typeof TaskSchema>;
