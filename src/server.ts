import env from "./config/env";
import app from "./app";
import { logger } from "./config/logger";

const server = app.listen(env.PORT, () => {
  logger.info(`Server running at ${env.PORT}`);
});

server.on("close", () => {
  logger.info("Server closed");
});

process.on("unhandledRejection", (reason) => {
  logger.fatal(reason, "Unhandled Rejection occured");
  throw reason;
});

process.on("uncaughtException", (err) => {
  logger.fatal(err, "Uncaught Exception occured");
  // shutdown server gracefully
  server.close(() => {
    process.exit(1);
  });

  // If a graceful shutdown is not possible, force exit the process
  setTimeout(() => {
    process.abort(); //exit immediately and generate a core dump file
  }, 5000).unref();
  process.exit(1);
});

process.on("SIGTERM", () => {
  server.close();
  logger.info("SIGTERM received");
});

process.on("SIGINT", () => {
  server.close();
  logger.info("SIGINT received");
});
