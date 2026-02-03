import express from "express";
import cors from "cors";

import subjectsRoutes from "./routes/subjects.js";
import topicsRoutes from "./routes/topics.js";
import plannerRoutes from "./routes/planner.js";
import progressRoutes from "./routes/progress.js";
import dashboardRoutes from "./routes/dashboard.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/subjects", subjectsRoutes);
app.use("/topics", topicsRoutes);
app.use("/planner", plannerRoutes);
app.use("/progress", progressRoutes);
app.use("/dashboard", dashboardRoutes);

app.get("/", (req, res) => {
  res.send("Smart Study Planner Backend is running");
});

export default app;
