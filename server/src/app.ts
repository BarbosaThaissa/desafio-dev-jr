import express from "express";
import tasksRouter from "./routes/tasks";

const app = express();

app.use(express.json());
app.use("/tasks", tasksRouter);

const port = 3333;
const host = "0.0.0.0";

app.listen(port, host, () => {
  console.log(`🚀 HTTP server running on ${host}:${port}`);
});

export default app;
