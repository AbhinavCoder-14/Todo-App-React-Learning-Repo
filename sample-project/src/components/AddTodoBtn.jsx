import React, { useContext,useEffect } from "react";
import { useState } from "react";
import {todoDataContext} from "../App.jsx"


function AddTodoBtn() {

  const {todoData,setTodoData} = useContext(todoDataContext)

  const [isOpenBtn, setIsOpenBtn] = useState(false);
  const [todoText, setTodoText] = useState("");
  const [priority, setPriority] = useState("");
  const [category, setCategory] = useState("");
 
  const [isCompleted, setIsCompleted] = useState(false);


  const handleSubmit = () => {
    const tempList = {
      id: todoData.length == 0 ? 1 : todoData[todoData.length - 1].id + 1,
      taskName: todoText,
      category: category,
      priority: priority,
      Completed: isCompleted,
    };

    setTodoData([...todoData, tempList]);
    setTodoText("");
    setCategory("");
    setPriority("");
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
          onClick={() => {
            setIsOpenBtn(!isOpenBtn);
          }}
        >
          + Add New Todo
        </button>
      ) : (
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What needs to be done?
              </label>
              <input
                type="text"
                value={todoText}
                onChange={(e) => setTodoText(e.target.value)}
                placeholder="Enter your todo..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                onKeyPress={(e) => e.key === "Enter" && handleSubmit(e)}
                autoFocus
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Priority
                </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="personal">Personal</option>
                  <option value="work">Work</option>
                  <option value="learning">Learning</option>
                  <option value="health">Health</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={handleSubmit}
                className="flex-1 bg-green-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-600 transition-colors"
              >
                Add Todo
              </button>
              <button
                onClick={() => {
                  setIsOpenBtn(false);
                  setTodoText("");
                }}
                className="flex-1 bg-gray-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-600 transition-colors"
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
