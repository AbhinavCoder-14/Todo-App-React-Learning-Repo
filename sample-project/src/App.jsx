import React from "react";
import Header from "./components/Header.jsx"
import Items from "./components/TodoItem.jsx"
import Button from "./components/Button.jsx";


function App() {
  return (
    <div className="Todo-Container">
    <Header/>
    <Items/>
    <Button/>
    </div>
  )
}

export default App;
