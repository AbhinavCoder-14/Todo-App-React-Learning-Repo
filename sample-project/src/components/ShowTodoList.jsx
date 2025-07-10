import React from "react";
import { useState, useContext, createContext } from "react";
import { todoDataContext } from "../App";

function ShowTodoList() {
  const { todoData, setTodoData } = useContext(todoDataContext);


  const handleDeleteTasks = (id) => {
    setTodoData(todoData.filter((task) => task.id != id));
  };

  return (
    <div className="Todo-Container">
      <div className="items">
        {todoData.map((task) => {
          return (
            <div className="item">
              <button onClick={() => handleDeleteTasks(task.id)}>X</button>
              <input type="checkbox" key={task.id} />
              <h1>{task.taskName}</h1>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ShowTodoList;
