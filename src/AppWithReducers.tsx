import React, {useState, useReducer} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";
import AddItemForm from './AddItemForm';
import { AppBar, Toolbar, IconButton, Typography, Button, Container, Grid, Paper } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import { todoListsReducer, ChangeTodoListTitleActionCreator, RemoveTodoListActionCreactor, ChangeTodoListFilterActionCreator, AddTodolistActionCreactor } from './state/todolists-reducer';
import { tasksReducer, removeTasksActionCreator, addTaskActionCreator, changeTaskStatusActionCreator, changeTaskTitleActionCreator } from './state/task-reducer';

export type FilterValueType = "all" | "active" | "completed";
export type TaskType = {
    id: string,
    isDone: boolean,
    title: string
}

export type TodoListType = {
    id: string
    title: string
    filter: FilterValueType
}

export  type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithReducers() {


    // ид тудулистов
    let todoListId1 = v1();
    let todoListId2 = v1();


    //данные тудулиста
    let [todoLists, dispatchToTodolist] = useReducer(todoListsReducer, [
        {id: todoListId1, title: "Books", filter: "all"},
        {id: todoListId2, title: "Songs", filter: "active"},
    ]);
    
    //такси тудулистов
    let [tasks, dispatchToTask] = useReducer( tasksReducer ,{
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
        dispatchToTask(changeTaskStatusActionCreator(taskId, isDone, id))
    }

    function changeTaskTitle(id: string, title: string, todoListID: string) {
        dispatchToTask(changeTaskTitleActionCreator(id, title, todoListID))
    }

    function removeTask(id: string, todoListId:string) {
        dispatchToTask(removeTasksActionCreator(id, todoListId))
    }

    function addTask(title: string, todoListId:string) {
        dispatchToTask(addTaskActionCreator(title, todoListId))
    }

    function changeFilter(id: string, value: FilterValueType) {
        dispatchToTodolist(ChangeTodoListFilterActionCreator(value, id))
    }

    function removeTodoList(id: string) {
        let action = RemoveTodoListActionCreactor(id);
        dispatchToTodolist(action)
        dispatchToTask(action)
    }

    function addTodoList(title: string) {
        let action = AddTodolistActionCreactor(title)
        dispatchToTodolist(action) 
        dispatchToTask(action)
    }

    function changeTodolistTitle(newTitle: string, todolistId: string) {
        dispatchToTodolist(ChangeTodoListTitleActionCreator(newTitle, todolistId))
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start"  color="inherit" aria-label="menu">
                    <Menu />
                    </IconButton>
                    <Typography variant="h6" >
                    TodoList
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>

            <Container fixed>
                <Grid container style={{padding: '15px'}}>
                    <AddItemForm additem={addTodoList} />
                </Grid>
                <Grid container spacing={3}>
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
                                <Grid item key={item.id}>
                                    <Paper style={{padding:'15px'}} elevation={3}>
                                        <TodoList
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
                                    </Paper>
                                </Grid>
                            )
                        })
                    }
                 </Grid>
            </Container>
        </div>
    );
}

export default AppWithReducers;
