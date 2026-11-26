import { z } from "zod";

export const addressSchema = z.object({
  name: z.string().trim().min(1, "Address name is required"),
  details: z.string().trim().min(1, "Full address is required"),
  phone: z.string().trim().min(1, "Phone number is required"),
  city: z.string().trim().min(1, "City is required"),
});

export type AddressInput = z.infer<typeof addressSchema>;
