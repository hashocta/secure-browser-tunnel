
import * as z from "zod";

// Username validation schema
export const usernameSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" })
    .max(50, { message: "Username must be less than 50 characters" })
    .regex(/^[a-zA-Z0-9_.-]+$/, { 
      message: "Username can only contain letters, numbers, and -_." 
    }),
});

// Email validation schema
export const emailSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address" }),
});

// Password validation schema
export const passwordSchema = z.object({
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[^a-zA-Z0-9]/, { message: "Password must contain at least one special character" }),
});

// Combined schema for all three steps
export const authSchema = usernameSchema.merge(emailSchema).merge(passwordSchema);

export type UsernameFormData = z.infer<typeof usernameSchema>;
export type EmailFormData = z.infer<typeof emailSchema>;
export type PasswordFormData = z.infer<typeof passwordSchema>;
export type AuthFormData = z.infer<typeof authSchema>;
