import React from 'react';
import { FilterValueType } from './App'
import AddItemForm from './AddItemForm';
import EditableSpan from './EditableSpan';
import { IconButton, Button, Checkbox } from '@material-ui/core';
import {Delete} from "@material-ui/icons";

type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

type PropsType = {
    id:string
    title: string
    tasks: Array<TaskType>
    filter: FilterValueType
    removeTask: (id: string, todoListId:string)                      => void
    changeFilter: (id: string, value: FilterValueType )              => void
    addTask: (title: string, todoListId:string)                      => void
    changeTaskStauts: (id: string, isDone: boolean, taskId:string)   => void
    removeTodoList: (id:string)                                      => void
    changeTaskTitle: (id: string, title: string, todoListID: string) => void
}

const TodoList = (props: PropsType) => {

    let jsxTasks = props.tasks.map(item => {

        const onTitleCangheCallBack = (newTitle: string)=> {
            props.changeTaskTitle(item.id, newTitle, props.id)
        }

        const deleteTodoList = () => {
            props.removeTask(item.id, props.id)
        }

        return <div key={item.id} className={item.isDone ? "is-Done" : ""}>
                    <Checkbox
                        onChange={(e) => {props.changeTaskStauts(item.id, e.currentTarget.checked, props.id)}}
                        checked={item.isDone}
                        color={"primary"}
                    />
                    {/* <input type="checkbox"
                            onChange={(e) => {props.changeTaskStauts(item.id, e.currentTarget.checked, props.id)}}
                            checked={item.isDone}/> */}
                    <EditableSpan title={item.title} saveTitle={ onTitleCangheCallBack }/>
                    <IconButton onClick={deleteTodoList}>
                        <Delete />
                    </IconButton>
              </div>
    });

    const deleteTodoList = () => { props.removeTodoList(props.id) }
    const onAllChangeFilter = () => { props.changeFilter( props.id, "all"); }
    const onActiveChangeFilter = () => {  props.changeFilter( props.id, "active"); }
    const onCompletedlChangeFilter = () => { props.changeFilter( props.id, "completed"); }

    const createTaskTitle = (title: string) => {
            props.addTask(title, props.id)
    }

 
    return (
        <div>
            <div>
                <h3>{props.title}</h3>
                <IconButton onClick={deleteTodoList}>
                    <Delete />
                </IconButton>
            </div>
            <AddItemForm additem={createTaskTitle}/>
            <div>
                { jsxTasks }
            </div>
            <div>
                <Button 
                        onClick={() => { onAllChangeFilter() }}
                        color={props.filter === 'all' ? 'secondary' : 'primary'}
                        variant={"outlined"}>All</Button>

                <Button 
                        onClick={() => { onActiveChangeFilter() }}
                        color={props.filter === 'active' ? 'secondary' : 'primary'}
                        variant={"outlined"}>Active</Button>

                <Button 
                        onClick={() => { onCompletedlChangeFilter() }}
                        color={props.filter === 'completed' ? 'secondary' : 'primary'}
                        variant={"outlined"}>Completed</Button>
            </div>
        </div>
    )
};

export default TodoList;