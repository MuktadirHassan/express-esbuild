import "dotenv/config";
import { z } from "zod";
import { ServerError } from "../utils/Error";

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

  throw new ServerError(500, errMessage);
}

export default env.data;
