import express from "express";
import authRouter from "./routes/auth.route.js";

const app = express();
app.use(express.json());

app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
  res.send("Server is working!");
});

export default app;
