import React, { createContext, useEffect } from "react";
import { useState } from "react";
import "./style.css";
import { Route,Routes } from "react-router-dom";
import {useQuery,QueryClient,QueryClientProvider} from '@tanstack/react-query'

// import AddTodoBtn from "./components/AddTodoBtn.jsx";
// import ShowTodoList from "./components/ShowTodoList.jsx";
// import FilterBar from "./components/FilterBar.jsx";
// import Header from "./components/Title.jsx";
import AuthPage from "./pages/Auth.jsx";
import Todo from "./pages/todo.jsx";

// export const todoDataContext = createContext();

function App() {
  const client = new QueryClient()

  return(
    <QueryClientProvider client={client}>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/todo" element={<Todo />} />
      </Routes>
    </QueryClientProvider>
    
    
    );
}

export default App;
