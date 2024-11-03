import { z } from "zod";
import { email,  namefirst, detalis } from "./common";

export const contactsSchema = z
  .object({
    namefirst,
    email,
    detalis
  })
