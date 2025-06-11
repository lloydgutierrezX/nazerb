
import { z } from "zod";
<<<<<<< HEAD
export const PositionSchema = z.object({
=======
export const employeeStatusSchema = z.object({
>>>>>>> fe75a4b711106bcdaeaf02053435b0e87bb7f89b
  active: z.coerce.boolean(),
  name: z.string().min(4).max(60),
  description: z.string().max(255).nullable(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
});

<<<<<<< HEAD
export type IPosition = z.infer<typeof PositionSchema>;
=======
export type IPosition = z.infer<typeof employeeStatusSchema>;
>>>>>>> fe75a4b711106bcdaeaf02053435b0e87bb7f89b
