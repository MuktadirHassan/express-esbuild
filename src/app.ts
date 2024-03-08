import express from "express";
import { handleGlobalError } from "./utils/Error";
import cors from "cors";

const app = express();
// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});


app.use(handleGlobalError);

export default app;
