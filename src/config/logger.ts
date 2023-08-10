import pino from "pino";
import { z } from "zod";

export const logger = pino({});
export const levelSchema = z.enum([
  "trace",
  "debug",
  "info",
  "warn",
  "error",
  "fatal",
  "silent",
]);
