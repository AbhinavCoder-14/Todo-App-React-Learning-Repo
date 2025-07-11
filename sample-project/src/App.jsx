import React, { createContext, useEffect } from "react";
import { useState } from "react";
import "./style.css";

import AddTodoBtn from "./components/AddTodoBtn.jsx";
import ShowTodoList from "./components/ShowTodoList.jsx";
import FilterBar from "./components/FilterBar.jsx";

export const todoDataContext = createContext()

function App() {
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
  

  return (
    // header
    <todoDataContext.Provider value={{todoData, setTodoData}}>
    <div>
      <AddTodoBtn/>

      <ShowTodoList/>
      
      
    </div>

    <FilterBar/>

    </todoDataContext.Provider>


  );
}

export default App;
