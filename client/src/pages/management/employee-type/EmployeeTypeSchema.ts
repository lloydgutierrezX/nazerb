
import { z } from "zod";
<<<<<<< HEAD
export const employeeStatusSchema = z.object({
=======
export const employeeTypeSchema = z.object({
>>>>>>> 8aec6545caadd374f375925b6a6ab3413277fddb
  active: z.coerce.boolean(),
  name: z.string().min(4).max(60),
  description: z.string().max(255).nullable(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
});

<<<<<<< HEAD
export type IEmployeeType = z.infer<typeof employeeStatusSchema>;
=======
export type IEmployeeType = z.infer<typeof employeeTypeSchema>;
>>>>>>> 8aec6545caadd374f375925b6a6ab3413277fddb
