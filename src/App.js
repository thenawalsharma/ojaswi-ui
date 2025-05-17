import logo from './logo.svg';
import './App.css';
import React, { useState } from "react";



function App() {
  const [task, setTask] = useState("");
  return (
    <div className="App">
      <header className="App-header">
        <input type="text" placeholder="Enter task" value={task} onChange={(e)=>setTask(e.target.value)}/>
        <button onClick={()=>console.log(task)}>Add Task</button>
      </header>
    </div>
  );
}

export default App;
