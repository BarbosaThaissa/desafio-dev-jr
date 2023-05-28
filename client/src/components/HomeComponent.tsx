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
    <div className="todo-container">
      <header>
        <h1>To Do List</h1>
      </header>
      <form id="todo-form">
        <p>Adicione sua tarefa</p>
        <div className="form-control">
          <input
            type="text"
            id="todo-input"
            placeholder="O que você vai fazer?"
          />
          <button type="submit">
            <i className="fa-thin fa-plus"></i>
          </button>
        </div>
      </form>
      <form id="edit-form" className="hide">
        <p>Edite sua tarefa</p>
        <div className="form-control">
          <input type="text" id="edit-input" />
          <button type="submit">
            <i className="fa-solid fa-check-double"></i>
          </button>
        </div>
        <button id="cancel-edit-btn">Cancelar</button>
      </form>
      <div id="toolbar">
        <div id="search">
          <h4>Pesquisar:</h4>
          <form>
            <input type="text" id="search-input" placeholder="Buscar..." />
            <button id="erase-button">
              <i className="fa-solid fa-delete-left"></i>
            </button>
          </form>
        </div>
        <div id="filter">
          <h4>Filtrar:</h4>
          <select id="filter-select">
            <option value="all">Todos</option>
            <option value="done">Feitos</option>
            <option value="todo">A fazer</option>
          </select>
        </div>
      </div>
      <div id="todo-list">
        {tasks.map((task) => (
          <div
            key={task.id}
            style={{
              textDecoration: task.concluida ? "line-through" : "none",
            }}
          >
            <h3>{task.titulo}</h3>
            <div>
              <button onClick={() => handleToggleTask(task.id)}>
                {task.concluida ? "Desfazer" : "Concluir"}
              </button>
              <button>Editar</button>
              <button onClick={() => handleDeleteTask(task.id)}>Excluir</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeComponent;
