import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/_healthcheck", (req, res) => {
  res.send("OK");
});

export default app;
