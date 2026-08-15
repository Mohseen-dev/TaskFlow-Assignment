import express from "express";
import router from "./routes/boardRoutes.js";
import taskRouter from "./routes/taskRoutes.js"
import errorHandler from "./middleware/erroHandler.js";
import cors from 'cors';
const app = express();

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ limit: "16kb", extended: true }));
// app.use(express.static("public")); for later use , if required

app.use(cors({
  origin: "http://localhost:5173"
}));

app.use("/api/boards",router);
app.use("/api/tasks",taskRouter)

app.use(errorHandler);

export { app };
