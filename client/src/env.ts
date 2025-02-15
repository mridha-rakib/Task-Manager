import { createEnv } from "@t3-oss/env-nextjs";
import { ZodError, z } from "zod";

export const env = createEnv({
  client: {
    NEXT_PUBLIC_API_BASE_URL: z.string().min(1),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_URI,
  },
  onValidationError: (issues) => {
    console.error(
      "❌ Invalid environment variables:",
      issues.map((issue) => issue.message).join(", ")
    );
    process.exit(1);
  },
});
