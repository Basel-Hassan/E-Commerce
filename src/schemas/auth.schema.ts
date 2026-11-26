import { z } from "zod";

const egyptianPhone = /^01[0125]\d{8}$/;

const strongPassword = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[0-9]/, "Password must include a number")
  .regex(/[^A-Za-z0-9]/, "Password must include a symbol");

export const loginSchema = z.object({
  email: z.email("Enter a valid email address"),
  password: z.string().min(1, "Enter your password"),
  rememberMe: z.boolean().optional(),
});

export const registerSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(3, "Name must be at least 3 characters")
      .max(40, "Name must be 40 characters or less"),
    email: z.email("Enter a valid email address"),
    password: strongPassword,
    rePassword: z.string().min(1, "Confirm your password"),
    phone: z
      .string()
      .trim()
      .regex(egyptianPhone, "Enter a valid Egyptian phone number"),
    terms: z
      .boolean()
      .refine((value) => value, "Please accept the terms to continue"),
  })
  .refine((values) => values.password === values.rePassword, {
    path: ["rePassword"],
    message: "Passwords do not match",
  });

export const forgotPasswordSchema = z.object({
  email: z.email("Enter a valid email address"),
});

export const verifyResetCodeSchema = z.object({
  resetCode: z
    .string()
    .trim()
    .regex(/^\d{6}$/, "Enter the 6-digit code from your email"),
});

export const resetPasswordSchema = z
  .object({
    email: z.email("Enter a valid email address"),
    newPassword: strongPassword,
    rePassword: z.string().min(1, "Confirm your new password"),
  })
  .refine((values) => values.newPassword === values.rePassword, {
    path: ["rePassword"],
    message: "Passwords do not match",
  });

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type VerifyResetCodeInput = z.infer<typeof verifyResetCodeSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
