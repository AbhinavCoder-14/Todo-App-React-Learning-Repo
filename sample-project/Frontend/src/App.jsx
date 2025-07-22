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
import axios from "axios";

// export const todoDataContext = createContext();

function App() {
  const client = new QueryClient()

    const setAuthToken = (token) => {
    if (token) {
      // Apply authorization token to every request if logged in
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      // Delete auth header
      delete axios.defaults.headers.common['Authorization'];
    }
  };

  useEffect(() => {
    // ✅ CHECK FOR TOKEN ON APP LOAD
    const token = localStorage.getItem('token');
    if (token) {
      setAuthToken(token);
      // You might also want to fetch the user's data here
      // and update your application's state.
      // e.g., fetchUser().then(user => setUser(user));
    }
  }, []);

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
