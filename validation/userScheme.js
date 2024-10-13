import { z } from "zod";
import { email, phone, namefirst, surname, City, address, street, postalCode } from "./common";

export const userScheme = z
  .object({
    namefirst,
    surname,
    email,
    phone,
    address,
    City,
    street,
    postalCode
  })
