import {useState} from "react";
import { useContext } from "react";
import { todoDataContext } from "../pages/todo.jsx";


import "../style.css"



function FilterBar(){
    const { todoData, setTodoData,filter,setFilter,filteredTodos } = useContext(todoDataContext);
    

    const completedCount = todoData.filter(todo=>{
        return (todo.completed)
    }).length

    const active = todoData.filter(todo=>{
        return (!todo.completed)
    }).length




    



    return(
        <>
        <div className="filter-bar">
            <div className="filter-buttons">
                <button className={`filter-btn ${
              filter === 'all' 
                ? 'btn-true' 
                : 'btn-false'
            }`} onClick={()=>{setFilter("all")}}>All ({todoData.length})</button>
                <button className={`filter-btn ${
              filter === 'completed' 
                ? 'btn-true' 
                : 'btn-false'
            }`} onClick={()=>{setFilter("completed")}}>completed ({completedCount})</button>
                <button className={`filter-btn ${
              filter === 'active' 
                ? 'btn-true' 
                : 'btn-false'
            }`} onClick={()=>{setFilter("active")}}>Active ({active})</button>

            </div>

        </div>

        
        </>
    )
}


export default FilterBar;