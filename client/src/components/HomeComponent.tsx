"use client";

import { useEffect, useState } from "react";
import axios from "axios";

type Task = {
  id: number;
  titulo: string;
  concluida: boolean;
};

const HomeComponent: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get<Task[]>("http://localhost:3333/tasks");
      setTasks(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateTask = async () => {
    try {
      const response = await axios.post<Task>("http://localhost:3333/tasks", {
        titulo: newTask,
        concluida: false,
      });
      setTasks((prevTasks) => [...prevTasks, response.data]);
      setNewTask("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleToggleTask = async (taskId: number) => {
    try {
      const task = tasks.find((task) => task.id === taskId);
      if (!task) return;

      const updatedTask = { ...task, concluida: !task.concluida };
      await axios.patch(`http://localhost:3333/tasks/${taskId}`, updatedTask);

      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === taskId ? updatedTask : task))
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    try {
      await axios.delete(`http://localhost:3333/tasks/${taskId}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="border-b bg-gray-50 max-w-[450px] p-6 rounded-2xl">
      <header className="text-center pt-0 pr-4 pl-4 pb-4 border-b border-gray-300">
        <h1 className="font-extrabold text-3xl">To Do List</h1>
      </header>
      <article className="p-6 border-b border-gray-300">
        <p className="font-semibold mb-2">Adicione sua tarefa</p>
        <div className="flex">
          <input
            type="text"
            className="pt-1 pb-1 pr-2 pl-2 mr-[6px] border border-gray-800"
            placeholder="O que você vai fazer?"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button onClick={handleCreateTask}>
            <i className="fa-thin fa-plus"></i>
          </button>
        </div>
      </article>

      <article>
        {tasks.map((task) => (
          <section
            key={task.id}
            className={`flex justify-around items-center p-4 transition-all border-b border-gray-300 ${
              task.concluida ? "bg-gray-600" : ""
            } ${task.concluida ? "text-white" : ""}`}
          >
            <h3
              className={`
              ${task.concluida ? "line-through" : "none"} ${
                task.concluida ? "italic" : ""
              } flex-1 text-base
            `}
            >
              {task.titulo}
            </h3>
            <div className="flex">
              <button
                className="ml-2"
                onClick={() => handleToggleTask(task.id)}
              >
                <i className="fa-solid fa-check"></i>
              </button>
              <button
                className="ml-2"
                onClick={() => handleDeleteTask(task.id)}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
          </section>
        ))}
      </article>
    </section>
  );
};

export default HomeComponent;
