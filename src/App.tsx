import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";


export type FilterValueType = "all" | "active" | "completed";

function App() {
    
    let [tasks, setTasks] = useState([
        {id: 1, title: "JS", isDone: true},
        {id: 2, title: "React", isDone: true},
        {id: 3, title: "Redux", isDone: false},
        {id: 4, title: "RestApi", isDone: false},
        {id: 5, title: "GraphQl", isDone: false}
    ]);


    let [filter, setFilter] = useState<FilterValueType>("active");
    let tasksForTodoList = tasks;


    function removeTask(id: number) {
        let filteredTasks = tasks.filter(t => t.id !== id);
        setTasks(filteredTasks);
    }

    function changeFilter(value: FilterValueType) {
        setFilter(value);
    }

    if(filter === "active") {
        tasksForTodoList = tasks.filter(t => t.isDone === false)
    }

    if(filter === "completed") {
        tasksForTodoList = tasks.filter(t => t.isDone === true)
    }


    
    return (
        <div className="App">
            <div className="container">
              <TodoList title={"What to Learn"} tasks={tasksForTodoList} removeTask={removeTask} changeFilter={changeFilter}/>
            </div>
        </div>
    );
}

export default App;
