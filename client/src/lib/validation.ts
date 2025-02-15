import { z } from "zod";

export const formSchema = z
  .object({
    name: z.string().trim().min(1, {
      message: "Name is required",
    }),
    email: z.string().trim().email().min(1, {
      message: "Email is required",
    }),
    password: z.string().trim().min(1, {
      message: "Password is required",
    }),
    confirmPassword: z.string().min(1, {
      message: "Confirm Password is required",
    }),
  })
  .refine((val) => val.password === val.confirmPassword, {
    message: "Password does not match",
    path: ["confirmPassword"],
  });
