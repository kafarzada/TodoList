import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";

export type FilterValueType = "all" | "active" | "completed";
type TaskType = {
    id: string,
    isDone: boolean,
    title: string
}
function App() {
    
    let [tasks, setTasks] = useState <Array<TaskType>>([
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "React", isDone: true},
        {id: v1(), title: "Redux", isDone: false},
        {id: v1(), title: "RestApi", isDone: false},
        {id: v1(), title: "GraphQl", isDone: false}
    ]);


    let [filter, setFilter] = useState<FilterValueType>("all");
    let tasksForTodoList = tasks;


    function removeTask(id: string) {
        let filteredTasks = tasks.filter(t => t.id !== id);
        setTasks(filteredTasks);
    }

    function changeFilter(value: FilterValueType) {
        setFilter(value);
    }

    function addTask(title: string) {
        let newTask = {id: v1(), title: title, isDone: false};
        setTasks([newTask, ...tasks])
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
              <TodoList title={"What to Learn"} tasks={tasksForTodoList} removeTask={removeTask} changeFilter={changeFilter} addTask={addTask}/>
            </div>
        </div>
    );
}

export default App;
