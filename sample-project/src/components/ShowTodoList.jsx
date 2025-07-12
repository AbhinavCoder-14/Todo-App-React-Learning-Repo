import React, { useEffect } from "react";
import { useState, useContext, createContext } from "react";
import { todoDataContext } from "../App";
import {
  Plus,
  X,
  Check,
  Edit3,
  Trash2,
  Calendar,
  Filter,
  CheckCircle2,
  Circle,
} from "lucide-react";

import "../style.css";

function ShowTodoList() {
  const { todoData, setTodoData,filter,setfilter,filteredTodos } = useContext(todoDataContext);

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

  useEffect(() => {
    console.log(todoData);
  }, []);

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
