import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";
import AddItemForm from './AddItemForm';

export type FilterValueType = "all" | "active" | "completed";
type TaskType = {
    id: string,
    isDone: boolean,
    title: string
}

type TodoListType = {
    id: string
    title: string
    filter: FilterValueType
}

type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    // ид тудулистов
    let todoListId1 = v1();
    let todoListId2 = v1();

    //данные тудулиста
    let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListId1, title: "Books", filter: "all"},
        {id: todoListId2, title: "Songs", filter: "active"},
    ]);
    

    //такси тудулистов
    let [tasks, setTasks] = useState<TasksStateType>({
        [todoListId1] : [
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: true},
            {id: v1(), title: "Redux", isDone: false},
        ],

        [todoListId2] : [
            {id: v1(), title: "RestApi", isDone: false},
            {id: v1(), title: "GraphQl", isDone: false}
        ]
    });


    function changeStatus(id: string, isDone: boolean, taskId:string) {
        let todoListTasks = tasks[taskId]
        let task = todoListTasks.find( item => item.id === id );
        if(task) {
            task.isDone = isDone 
            setTasks({...tasks})
        }
    }

    function changeTaskTitle(id: string, title: string, todoListID: string) {
        let todoListTasks = tasks[todoListID];
        let task = todoListTasks.find(task => task.id === id);
        if(task) {
            task.title = title;
            setTasks({...tasks})
        }  
    }



    function removeTask(id: string, todoListId:string) {
        let todoListTasks = tasks[todoListId]
        tasks[todoListId] = todoListTasks.filter(t => t.id !== id);
        setTasks({...tasks});
    }



    function addTask(title: string, todoListId:string) {
        let newTask = {id: v1(), title: title, isDone: false};
        let todoListTasks = tasks[todoListId];
        tasks[todoListId] = [newTask, ...todoListTasks]
        setTasks({...tasks})
    }


    function changeFilter(id: string, value: FilterValueType) {
        let todolist = todoLists.find(item => item.id === id)
        if(todolist) {
            todolist.filter = value
            setTodoLists([...todoLists])
        }
    }


    function removeTodoList(id: string) {
        setTodoLists(todoLists.filter( item => item.id !== id))
        delete tasks[id];
        setTasks({...tasks});
    }


    function addTodoList(title: string) {
        let newTodoListD = v1();
        let newTodoList: TodoListType = {
            id: newTodoListD,
            title: title,
            filter: 'all'
        }

        setTodoLists([newTodoList, ...todoLists])
        setTasks({
                ...tasks,
                [newTodoListD]: []
        })
    }

    
    return (
        <div className="App">
            <div className="container">
                <div className={"app__inner"}>
                    <AddItemForm additem={addTodoList} />
                    {
                        todoLists.map( item => {
                            let allTasks = tasks[item.id]
                            let tasksForTodoList = allTasks;

                            if(item.filter === "active") {
                                tasksForTodoList = allTasks.filter(t => t.isDone === false)
                            }
                        
                            if(item.filter === "completed") {
                                tasksForTodoList = allTasks.filter(t => t.isDone === true)
                            }
                        
                            return (
                                <TodoList
                                    key={item.id}
                                    id={item.id}
                                    title={item.title} 
                                    tasks={tasksForTodoList} 
                                    removeTask={removeTask} 
                                    changeFilter={changeFilter} 
                                    addTask={addTask} 
                                    changeTaskStauts = {changeStatus}
                                    filter={item.filter}
                                    removeTodoList={removeTodoList}
                                    changeTaskTitle={changeTaskTitle}
                                />
                            )
                        })
                    }
               </div>
            </div>
        </div>
    );
}

export default App;
