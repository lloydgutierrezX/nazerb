import { z } from "zod";

export const roleSchema = z.object({
  name: z.string().min(4).max(60),
  description: z.string().nullable(),
  active: z.boolean(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
  rolePermission: z.array(z.object({
    permissionId: z.number()
  })),
  modules: z.string().optional(),
  permissions: z.array(z.object({
    permissionId: z.boolean()
  })).optional()
});