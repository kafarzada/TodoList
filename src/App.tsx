import React from 'react';
import './App.css';
import TodoList from "./TodoList";


function App() {
    
    let task1 = [
        {id: 1, title: "What to Learn", isDone: true},
        {id: 2, title: "Song", isDone: true},
        {id: 3, title: "Book", isDone: false}
    ];

    let task2 = [
        {id: 1, title: "Hello World", isDone: false},
        {id: 2, title: "I am Happy", isDone: true},
        {id: 3, title: "YO", isDone: false}
    ];


    return (
        <div className="App">
            <TodoList title={"What to Learn"} tasks={task1}/>
            <TodoList title={"Songs"} tasks={task2}/>
        </div>
    );
}

export default App;
