import express from "express";
import router from "./routes/boardRoutes.js";
import taskRouter from "./routes/taskRoutes.js"
const app = express();

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ limit: "16kb", extended: true }));
// app.use(express.static("public")); for later use , if required

app.use("/api/boards",router);
app.use("/api/tasks",taskRouter)

export { app };
