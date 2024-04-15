import express from "express";
import { handleGlobalError } from "./utils/Error";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(handleGlobalError);

export default app;
