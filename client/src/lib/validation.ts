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

export const loginSchema = z.object({
  email: z.string().trim().email().min(1, {
    message: "Email is required",
  }),
  password: z.string().trim().min(1, {
    message: "Password is required",
  }),
});

export const taskSchema = z.object({
  _id: z.string().optional(),
  user: z
    .string({ required_error: "User id required" })
    .min(1, "User ID is required")
    .optional(),
  title: z.string().min(1, "Please provide a title"),
  description: z.string().default("No description"),
  dueDate: z.preprocess(
    (arg) =>
      typeof arg === "string" || arg instanceof Date
        ? new Date(arg)
        : undefined,
    z.date().default(new Date())
  ),
  status: z.enum(["pending", "complete"]).default("pending"),
  completed: z.boolean().default(false),
});
