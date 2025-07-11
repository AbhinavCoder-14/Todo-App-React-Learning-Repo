import React, { useEffect } from "react";
import { useState, useContext, createContext } from "react";
import { todoDataContext } from "../App";

import "../style.css"

function ShowTodoList() {
  const { todoData, setTodoData } = useContext(todoDataContext);


  const handleDeleteTasks = (id) => {
    setTodoData(todoData.filter((task) => task.id != id));
  };

  const MarkAsCompleted = (id) => {
    setTodoData(todoData.map(todo =>{
      return todo.id == id ? {...todo,Completed: !todo.Completed} : todo
    }))
  };

  useEffect(()=>{
    console.log(todoData)
  },[])

  return (
    <div className="Todo-Container">
      <div className="items">
        {todoData.map((task) => {
          return (
            <div className="item">
              <button onClick={() => handleDeleteTasks(task.id)}>X</button>
              {/* {task.completed ? ():()} */}
              <input type="checkbox" checked={task.Completed} onChange={()=>MarkAsCompleted(task.id)} key={task.id} />

              <div className={task.Completed ? "completed-task" : ""}>
                <h1 className={task.Completed ? "cut" : ""}>{task.taskName}</h1>

                <span>
                  <p>{task.priority}</p>
                  <p>{task.category}</p>

                </span>
              </div>



             
              
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ShowTodoList;
