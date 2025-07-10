import React from "react";
import { useState,useContext,createContext } from "react";
import { todoDataContext } from "../App";

function ShowTodoList() {

    const {todoData, setTodoData} = useContext(todoDataContext);


    const [todoList,setTodoList] = useState([])
    const ThemeContext = createContext();


    

  const handleDeleteTasks = (id) =>{

    setTodoList(todoList.filter((task)=> task.id!=id))
  }

  return (



    <div className="Todo-Container">

      <input type="text" onChange={handleChangesOnInput} />
      <button onClick={addTaskToList}>Add Todo</button>

      <div className="items">
        {todoList.map((task)=>{
          return(
            <div className="item">
              <button onClick={ () => handleDeleteTasks(task.id)}>X</button>
              <input type="checkbox" key={task.id} />
              <h1>{task.taskName}</h1>

            </div>

          ) 
          
          
        })}

      </div>

  


    </div>
  )


}


export default ShowTodoList;