import {useState} from "react";
import { useContext } from "react";
import { todoDataContext } from "../App";

import "../style.css"



function FilterBar(){
    const { todoData, setTodoData } = useContext(todoDataContext);

    const completedCount = todoData.filter(todo=>{
        return (todo.Completed)
    }).length

    const active = todoData.filter(todo=>{
        return (!todo.Completed)
    }).length


    



    return(
        <>
        <div className="tempBor">
            <button>All ({todoData.length})</button>
            <button>Completed ({completedCount})</button>

            <button>Active ({active})</button>
        </div>

        
        </>
    )
}


export default FilterBar;