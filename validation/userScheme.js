import { z } from "zod";
import { email, phone, namefirst, surname, address, postalCode } from "./common";

export const userScheme = z
  .object({  
    namefirst,
    surname,
    email,
    phone,
    address,
    postalCode
  })
