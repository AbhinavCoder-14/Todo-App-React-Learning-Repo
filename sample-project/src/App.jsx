import React from "react";
import { useState } from "react";
import Header from "./components/Header.jsx"
import Button from "./components/Button.jsx";


function App() {
    const [newTask,setnewTask] = useState("")
    const [todoList,setTodoList] = useState([])

    const addTaskToList = () =>{

        const settodoList = [...todoList,{
          id: todoList.length == 0 ? 1 : todoList[todoList.length-1].id + 1,
          taskName: newTask,
        }]
        setTodoList(settodoList)
    }
    

  
  const handleChangesOnInput = (event) =>{
    setnewTask(event.target.value)
  }

  const handleDeleteTasks = (id) =>{

    setTodoList(todoList.filter((task)=> task.id!=id))
  }


  return (

    <div className="Todo-Container">

      <Header/>

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



export default App;
