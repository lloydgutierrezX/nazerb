import { z } from "zod";

export const permissionSchema = z.object({
  active: z.coerce.boolean().default(true),
  action: z.string().min(4).max(60).default(""),
  moduleId: z.string().nonempty("This field is required"),
  description: z.string().nullable().default(null),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
});

export type IPermission = z.infer<typeof permissionSchema>;
