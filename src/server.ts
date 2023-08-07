import env from "./config/env";
import app from "./app";
import prisma from "./config/prisma";

const server = app.listen(env.PORT, () => {
  console.log(`Server running at ${env.PORT}`);
  prisma
    .$connect()
    .then(() => {
      console.log("Connected to database");
    })
    .catch((err: Error) => {
      throw err;
    });
});

server.on("close", () => {
  console.log("Server closed");
  process.exit(0);
});

process.on("uncaughtException", (err) => {
  console.log("Uncaught Exception: ", err);
  server.close();
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  console.log("Unhandled Rejection: ", err);
  server.close();
  process.exit(1);
});

process.on("SIGTERM", () => {
  server.close();
  console.log("SIGTERM received");
});

process.on("SIGINT", () => {
  server.close();
  console.log("SIGINT received");
});
