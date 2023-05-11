import app from "./app";
import prisma from "./config/prisma";
const port = 3000;

const server = app.listen(port, () => {
  prisma
    .$connect()
    .then(() => {
      console.log("Connected to database");
    })
    .catch((err: Error) => {
      throw err;
    });
  console.log(`Server running at ${port}`);
});

server.on("close", (code: any) => {
  console.log(`Server stopped with code ${code}`);
});

process.on("uncaughtException", (err) => {
  server.close();
  console.log("Uncaught Exception: ", err);
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  server.close();
  console.log("Unhandled Rejection: ", err);
  process.exit(1);
});
