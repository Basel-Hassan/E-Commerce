import { z } from "zod";

const egyptianPhone = /^01[0125]\d{8}$/;

export const checkoutSchema = z.object({
  details: z
    .string()
    .trim()
    .min(10, "Address details must be at least 10 characters")
    .max(200, "Address details must be 200 characters or less"),
  phone: z
    .string()
    .trim()
    .regex(egyptianPhone, "Please enter a valid Egyptian phone number"),
  city: z
    .string()
    .trim()
    .min(2, "City name must be at least 2 characters")
    .max(60, "City must be 60 characters or less"),
  paymentMethod: z.enum(["cash", "online"]),
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;
export type ShippingAddressInput = Pick<
  CheckoutInput,
  "details" | "phone" | "city"
>;
