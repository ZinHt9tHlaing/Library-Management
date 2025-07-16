import z from "zod";

export const loginSchema = z.object({
  email: z.email({ message: "Please enter a valid email" }),
  password: z
    .string()
    .min(4, { message: "Password must be at least 4 characters" }),
});

export const registerSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" }),
  email: z.email({ message: "Please enter a valid email" }),
  password: z
    .string()
    .min(4, { message: "Password must be at least 4 characters" }),
});
