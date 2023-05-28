import express from "express";

const router = express.Router();

const tasks = [
  { id: 1, titulo: "Aprender React", concluida: true },
  { id: 2, titulo: "Estudar NodeJS", concluida: false },
  { id: 3, titulo: "Praticar TypeScript", concluida: false },
];

router.get("/", (req, res) => {
  res.json(tasks);
});

router.post("/", (req, res) => {
  const newTask = req.body;
  tasks.push(newTask);
  res.status(201).json(newTask);
});

router.patch("/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const updatedTask = req.body;

  const taskIndex = tasks.findIndex((task) => task.id === taskId);
  if (taskIndex !== -1) {
    tasks[taskIndex] = { ...tasks[taskIndex], ...updatedTask };
    res.json(tasks[taskIndex]);
  } else {
    res.status(404).json({ message: "Tarefa não encontrada." });
  }
});

router.delete("/:id", (req, res) => {
  const taskId = parseInt(req.params.id);

  const taskIndex = tasks.findIndex((task) => task.id === taskId);
  if (taskIndex !== -1) {
    const deletedTask = tasks.splice(taskIndex, 1);
    res.json(deletedTask);
  } else {
    res.status(404).json({ message: "Tarefa não encontrada." });
  }
});

export default router;
