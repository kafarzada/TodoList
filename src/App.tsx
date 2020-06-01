import React from 'react';
import './App.css';
import TodoList from "./TodoList";




function App() {
    
    let task1 = [
        {id: 1, title: "JS", isDone: true},
        {id: 2, title: "React", isDone: true},
        {id: 3, title: "Redux", isDone: false},
        {id: 4, title: "RestApi", isDone: true},
        {id: 5, title: "GraphQl", isDone: false}
    ];



    return (
        <div className="App">
            <TodoList title={"What to Learn"} tasks={task1}/>
        </div>
    );
}

export default App;
