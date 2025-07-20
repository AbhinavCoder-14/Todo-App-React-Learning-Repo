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

  const handleDeleteTasks = (_id) => {
    setTodoData(todoData.filter((task) => task._id != _id));
  };

  const MarkAscompleted = (_id) => {
    setTodoData(
      todoData.map((todo) => {
        if (todo._id == _id){
          console.log("Found matching todo:", todo)

        }
        // return (todo._id == _id) ? { ...todo, completed: !todo.completed } : todo;
      })
    );
  };
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["data"],
    queryFn: async () => {
      return await Axios.get("http://localhost:8000/todo/fetch", {
        // From Frontend/src/components/ShowTodoList.jsx
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // This is correct for header-based auth
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
        .then((res) => res.data)
        .catch((err) => {
          console.error("Error fetching todos:", err);
        });
    },
    refetchOnWindowFocus: false,
  });

  function printTodos() {
    console.log(isLoading);
    console.log(todoData);
  }

  // setTodoData(data)

  return (
    <div className="todo-item-content">
      {/* {!isLoading ? setTodoData(data.todo) : <p>loading...</p>} */}
      <div className="todo-content">
        {filteredTodos.map((task) => {
          return (
            <div
              className={
                task.completed
                  ? `todo-text completed-task todo-item-row setRowColor-${task.priority.toLowerCase()}`
                  : `todo-text todo-item-row setRowColor-${task.priority.toLowerCase()}`
              }
            >
              <div className="todo-item-left br" key={task._id}>
                <div className="checkboxAndTask">
                  <input
                    type="checkbox" key={task._id}
                    checked={task.completed}
                    onChange={() => MarkAscompleted(task._id)}
                  />
                  <p className={task.completed ? "cut" : ""}>{task.todoName}</p>
                </div>

                <div className="todo-actions">
                  <button
                    onClick={() => handleDeleteTasks(task._id)}
                    className="action-btn delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div
                className={
                  task.completed ? "todo-text completed-task" : "todo-text"
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
