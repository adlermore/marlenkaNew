import { z } from "zod";
import { name, email, phone } from "./common";

export const loginSchema = z.object({
  // name,
  email,
  // phone,
  password: z
    .string()
    .min(1, { message: "This field is required" })
    .max(50, { message: "Field must be at most 50 characters long" })
    .trim()
    .refine((val) => val.length > 0, {
      message: "Field cannot be empty or just spaces",
    }),
});
