import express from "express";
import cors from "cors";
import tasksRouter from "./routes/tasks";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/tasks", tasksRouter);

const port = 3333;
const host = "0.0.0.0";

app.listen(port, host, () => {
  console.log(`🚀 HTTP server running on ${host}:${port}`);
});

export default app;
