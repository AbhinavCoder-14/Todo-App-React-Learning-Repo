import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { todoDataContext } from "../pages/todo.jsx";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import  mutate from "@tanstack/react-query"


function AddTodoBtn() {
  const { todoData, setTodoData } = useContext(todoDataContext);

  const [isOpenBtn, setIsOpenBtn] = useState(false);
  const [todoText, setTodoText] = useState();
  const [priority, setPriority] = useState("Medium");
  const [category, setCategory] = useState("Work");

  const [isCompleted, setIsCompleted] = useState(false);


  const addTodo = async () => {
  const response = await fetch('http://localhost:8000/todo/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({

    }),
  });

  if (!response.ok) {
    throw new Error('An error occurred while creating the todo');
  }

  const tempList = {
      todoName: todoText,
      category: category,
      priority: priority,
      completed: isCompleted,
    };

  return response.json(tempList);
};

  const postTodo = () => {
    const queryClient = useQueryClient();
    const { mutate, isLoading, isError } = useMutation({
      mutationFn: addTodo,
      // When the mutation is successful, invalidate the 'todos' query
      onSuccess: () => {
        console.log("Todo added successfully!");
        // This will cause the useQuery hook for 'todos' to refetch
        queryClient.invalidateQueries({ queryKey: ["todos"] });
      },
    });
  };

  const handleSubmit = () => {

    mutate({ tempList, completed: false });
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
