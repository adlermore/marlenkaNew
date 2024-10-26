import { z } from "zod";
import { email, phone, namefirst, business, detalis, address } from "./common";

export const wholeSaleSchema = z
  .object({
    namefirst,
    business,
    email,
    phone,
    address,
    detalis
  })
