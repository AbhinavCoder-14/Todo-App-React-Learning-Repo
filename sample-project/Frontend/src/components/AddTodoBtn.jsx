import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { todoDataContext } from "../pages/todo.jsx";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import useCreateTodo from "../api/useCreateTodo.js";


function AddTodoBtn() {
  const { todoData, setTodoData } = useContext(todoDataContext);

  const [isOpenBtn, setIsOpenBtn] = useState(false);
  const [todoText, setTodoText] = useState();
  const [priority, setPriority] = useState("Medium");
  const [category, setCategory] = useState("Work");

  const [isCompleted, setIsCompleted] = useState(false);


    const { mutate: createTodo, isPending } = useCreateTodo();


  const handleSubmit = () => {

    const tempList = {
      todoName: todoText,
      category: category,
      priority: priority,
      completed: isCompleted,
    };
    setTodoData([...todoData, tempList]);
    setTodoText("");
    setCategory("Work");
    setPriority("Medium");
    setIsOpenBtn(false);
    console.log(todoData);

    createTodo(tempList)


  };
  useEffect(() => {
    console.log(todoData);
  }, [todoData]);

  return (
    <div>
      {!isOpenBtn ? (
        <button
          className="add-todo-btn"
          onClick={() => {
            setIsOpenBtn(!isOpenBtn);
          }}
        >
          + Add New Todo
        </button>
      ) : (
        <div>
          <div className="add-todo-form">
            <div className="form-group">
              <label className="form-label">What needs to be done?</label>
              <input
                type="text"
                value={todoText}
                onChange={(e) => setTodoText(e.target.value)}
                placeholder="Enter your todo..."
                className="form-input"
                onKeyPress={(e) => e.key === "Enter" && handleSubmit(e)}
                autoFocus
              />
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Priority</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="form-select"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="form-select"
                >
                  <option value="personal">Personal</option>
                  <option value="work">Work</option>
                  <option value="learning">Learning</option>
                  <option value="health">Health</option>
                </select>
              </div>
            </div>

            <div className="form-actions">
              <button onClick={handleSubmit} className="btn primary">
                Add Todo
              </button>
              <button
                onClick={() => {
                  setIsOpenBtn(false);
                  setTodoText("");
                }}
                className="btn secondary"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddTodoBtn;
