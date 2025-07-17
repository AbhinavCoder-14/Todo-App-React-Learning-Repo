import React, { createContext, useEffect } from "react";
import { useState } from "react";
import "../style.css";
import { Route, Routes } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Axios from "axios";

import AddTodoBtn from "../components/AddTodoBtn.jsx";
import ShowTodoList from "../components/ShowTodoList.jsx";
import FilterBar from "../components/FilterBar.jsx";
import Header from "../components/Title.jsx";

export const todoDataContext = createContext();

function Todo() {
  const [todoData, setTodoData] = useState([
    {
      id: 1,
      taskName: "jkl",
      category: "learning",
      priority: "high",
      Completed: false,
      length: 1,
    },
  ]);
  const [filter, setFilter] = useState("all");

  const filteredTodos = todoData.filter((todo) => {
    if (filter === "active") return !todo.Completed;
    if (filter === "completed") return todo.Completed;
    return true;
  });

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["todo"],
    queryFn: async () => {
      return await Axios.get("http://localhost:8000/todo/fetch").then(
        (res) => res.data
      );
    },
    refetchOnWindowFocus: false,
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
