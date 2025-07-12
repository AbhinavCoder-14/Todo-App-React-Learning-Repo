import {useState} from "react";
import { useContext } from "react";
import { todoDataContext } from "../App";

import "../style.css"



function FilterBar(){
    const { todoData, setTodoData,filter,setFilter,filteredTodos } = useContext(todoDataContext);
    

    const completedCount = todoData.filter(todo=>{
        return (todo.Completed)
    }).length

    const active = todoData.filter(todo=>{
        return (!todo.Completed)
    }).length




    



    return(
        <>
        <div className="filter-bar">
            <div className="filter-buttons">
                <button className="filter-btn" onClick={()=>{setFilter("all")}}>All ({todoData.length})</button>
                <button className="filter-btn" onClick={()=>{setFilter("completed")}}>Completed ({completedCount})</button>
                <button className="filter-btn" onClick={()=>{setFilter("active")}}>Active ({active})</button>

            </div>

        </div>

        
        </>
    )
}


export default FilterBar;