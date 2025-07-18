import React, { createContext, useEffect } from "react";
import { useState } from "react";
import "../style.css";
import { Route, Routes } from "react-router-dom";


import AddTodoBtn from "../components/AddTodoBtn.jsx";
import ShowTodoList from "../components/ShowTodoList.jsx";
import FilterBar from "../components/FilterBar.jsx";
import Header from "../components/Title.jsx";

export const todoDataContext = createContext();

function Todo() {
  const [todoData, setTodoData] = useState([
    {
      todoName: "jkl",
      category: "learning",
      priority: "high",
      completed: false,
      length: 1,
    },
  ]);
  const [filter, setFilter] = useState("all");

  const filteredTodos = todoData.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });



  return (
    <todoDataContext.Provider
      value={{ todoData, setTodoData, filter, setFilter, filteredTodos }}
    >
      <Header />
      <div className="todo-container">
        <div className="main-content">
          <AddTodoBtn />
          <FilterBar />
          <div>
            <ShowTodoList />
          </div>
        </div>
      </div>
    </todoDataContext.Provider>
  );
}

export default Todo;
