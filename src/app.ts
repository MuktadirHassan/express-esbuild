import express from "express";
import { log } from "node:console";
import fs from "node:fs/promises";
const app = express();

app.get("/", (req, res) => {
  fs.mkdir("test").then(() => {
    log("test");
  });
  res.json({
    message: "Hello World",
  });
});

app.get("/healthcheck", (req, res) => {
  res.send("OK");
});

export default app;
