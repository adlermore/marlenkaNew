import { z } from "zod";

export const cardSchema = z.object({
  cardNumber: z
    .string()
    .min(16, { message: "Card number must be at least 16 digits long" })
    .max(19, { message: "Card number must be at most 19 digits long" }),
    cardExperationDate: z
    .string()
    .min(5, { message: "Expiration date must be in MM/YY format" })
    .max(7, { message: "Expiration date must be in MM/YY format" })
    .refine((value) => {
      const parts = value.split("/");
      if (parts.length !== 2) return false;
      const month = parseInt(parts[0], 10);
      const year = parseInt(parts[1], 10);
      return month >= 1 && month <= 12 && year >= 0; // Basic MM/YY validation
    }, {
      message: "Invalid expiration date format. Use MM/YY.",
    })
    .transform((value) => value.trim()), // Trim whitespace

  cardCvv: z
    .string()
    .refine((val) => val.length === 3 || val.length === 4, {
      message: "CVV must be exactly 3 or 4 digits long",
    })
    .refine((value) => !isNaN(Number(value)), {
      message: "CVV must contain only digits",
    })
    .transform((value) => value.trim()), // Trim whitespace

  cardName: z
    .string()
    .min(1, { message: "This field is required" })
    .max(50, { message: "Field must be at most 50 characters long" })
    .transform((value) => value.trim()) // Trim whitespace
});