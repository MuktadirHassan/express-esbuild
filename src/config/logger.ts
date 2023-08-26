import pino from "pino";
import { z } from "zod";
import { isDev } from "./constants";

// const opts: pino.LoggerOptions = {
//   level: isDev ? "trace" : "info",

//   transport: {
//     targets: [
//       {
//         level: "trace",
//         target: "pino-pretty",
//         options: {},
//       },
//     ],
//   },
//   formatters: {
//     bindings(bindings) {
//       return {};
//     },
//   },
// };
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
