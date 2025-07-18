import React, { useEffect } from "react";
import { useState, useContext, createContext } from "react";
import { useQuery } from "@tanstack/react-query";
import Axios from "axios";

import { todoDataContext } from "../pages/todo.jsx";
import { Trash2 } from "lucide-react";

import "../style.css";

function ShowTodoList() {
  const { todoData, setTodoData, filter, setfilter, filteredTodos } =
    useContext(todoDataContext);

  const handleDeleteTasks = (id) => {
    setTodoData(todoData.filter((task) => task.id != id));
  };

  const MarkAsCompleted = (id) => {
    setTodoData(
      todoData.map((todo) => {
        return todo.id == id ? { ...todo, Completed: !todo.Completed } : todo;
      })
    );
  };

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["todo"],
    queryFn: async () => {
      return await Axios.get("http://localhost:8000/todo/fetch", {
        // From Frontend/src/components/ShowTodoList.jsx
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // This is correct for header-based auth
          "Content-Type": "application/json",
        },
        withCredentials: true, // This correctly sends cookies (though not strictly needed if relying on Authorization header) // ⬅️ only if you're using cookies (optional)
      }).then((res) => res.data).catch((err) => {
        console.error("Error fetching todos:", err);
      });
    },
    // refetchOnWindowFocus: false,
  });

  // useEffect(() => {
  //   // console.log(data);
  // }, []);

  return (
    <div className="todo-item-content">
      <div className="todo-content">
        {filteredTodos.map((task) => {
          return (
            <div
              className={
                task.Completed
                  ? `todo-text completed-task todo-item-row setRowColor-${task.priority}`
                  : `todo-text todo-item-row setRowColor-${task.priority}`
              }
            >
              <div className="todo-item-left br" key={task.id}>
                <div className="checkboxAndTask">
                  <input
                    type="checkbox"
                    checked={task.Completed}
                    onChange={() => MarkAsCompleted(task.id)}
                  />
                  <p className={task.Completed ? "cut" : ""}>{task.taskName}</p>
                </div>

                <div className="todo-actions">
                  <button
                    onClick={() => handleDeleteTasks(task.id)}
                    className="action-btn delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div
                className={
                  task.Completed ? "todo-text completed-task" : "todo-text"
                }
              >
                <div className="todo-badges">
                  <span className={`badge priority-${task.priority}`}>
                    {task.priority?.toUpperCase()}
                  </span>

                  {task.category && (
                    <span className="badge category">
                      {task.category.toUpperCase()}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
    // </div>
  );
}

export default ShowTodoList;
