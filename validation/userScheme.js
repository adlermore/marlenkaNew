import { z } from "zod";
import { email, phone, namefirst, surname, city, address, street, postalCode } from "./common";

export const userScheme = z
  .object({
    namefirst,
    surname,
    email,
    phone,
    address,
    city,
    // street,
    postalCode
  })
