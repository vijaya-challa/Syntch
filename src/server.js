// eslint-disable
import express from "express";
import dotenv from "dotenv";
import logger from "morgan";

import { fileURLToPath } from "url";
import activityRouter from "./routes/activityRouter.js";
import userRouter from "./routes/userRouter.js";
import levelRouter from "./routes/levelRouter.js";
import taskRouter from "./routes/taskRouter.js";
import scoreRouter from "./routes/scoreRouter.js";
import connectDB from "./lib/db.js";
import checkAuth from "./middleware/checkAuth.js";
// eslint-disable-next-line import/order
import { dirname, join } from "path";

// eslint-disable-next-line no-underscore-dangle
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
dotenv.config();
app.use(express.json());
app.use(logger("dev"));
app.use(express.static(join(__dirname, "../build")));
connectDB();

app.use("/activity", checkAuth, activityRouter);
app.use("/user", checkAuth, userRouter);
app.use("/level", levelRouter);
app.use("/task", taskRouter);
app.use("/score", scoreRouter);

app.get("*", (req, res) => {
  res.sendFile(join(__dirname, "../build/index.html"));
});
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`:+1: Server is running on http://localhost:${port}`);
});
