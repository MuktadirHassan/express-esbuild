import "dotenv/config";
import { z } from "zod";
import { AppError } from "../utils/Error";

const appEnvSchema = z
  .object({
    PORT: z.string(),
    NODE_ENV: z
      .string()
      .refine((value) => ["development", "production"].includes(value)),
  })
  .required();

const env = appEnvSchema.safeParse(process.env);

if (!env.success) {
  const errMessage = env.error.issues
    .map((issue) => `${issue.path.join(".")} ${issue.message}`)
    .join(", ");

  throw new AppError(errMessage, 500);
}

export default env.data;
