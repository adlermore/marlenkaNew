import { z } from "zod";
import { email, phone, namefirst, surname, City, address, postalCode } from "./common";

export const userScheme = z
  .object({
    namefirst,
    surname,
    email,
    phone,
    address,
    City,
    postalCode
  })
