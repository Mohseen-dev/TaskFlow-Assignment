import express from "express";
import router from "./routes/boardRoutes";
const app = express();

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ limit: "16kb", extended: true }));
// app.use(express.static("public")); for later use , if required

app.use("/api/boards/",router);
export { app };
