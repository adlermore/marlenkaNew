import { z } from "zod";
import { email, message, name, phone } from "./common";

export const contactSchema = z.object({
  name,
  email,
  phone,
  message,
});
