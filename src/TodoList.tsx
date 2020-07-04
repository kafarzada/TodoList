import React from 'react';
import { FilterValueType } from './App'
import s from './TodoList.module.css'
import AddItemForm from './AddItemForm';
import EditableSpan from './EditableSpan';

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
    removeTask: (id: string, todoListId:string)                    => void
    changeFilter: (id: string, value: FilterValueType )            => void
    addTask: (title: string, todoListId:string)                    => void
    changeTaskStauts: (id: string, isDone: boolean, taskId:string) => void
    removeTodoList: (id:string)                                    => void
    changeTaskTitle: (id: string, title: string, todoListID: string) => void
}



const TodoList = (props: PropsType) => {

    let jsxTasks = props.tasks.map(item => {

        const onTitleCangheCallBack = (newTitle: string)=> {
            props.changeTaskTitle(item.id, newTitle, props.id)
        }


        return <li key={item.id} className={item.isDone ? "is-Done" : ""}>
                    <input type="checkbox"
                            onChange={(e) => {props.changeTaskStauts(item.id, e.currentTarget.checked, props.id)}}
                            checked={item.isDone}/>
                    <EditableSpan title={item.title} saveTitle={ onTitleCangheCallBack }/>
                    <button onClick={() => { props.removeTask(item.id, props.id) } }>x</button>
              </li>
    });




    const deleteTodoList = () => { props.removeTodoList(props.id) }
    const onAllChangeFilter = () => { props.changeFilter( props.id, "all"); }
    const onActiveChangeFilter = () => {  props.changeFilter( props.id, "active"); }
    const onCompletedlChangeFilter = () => { props.changeFilter( props.id, "completed"); }

    const createTaskTitle = (title: string) => {
            props.addTask(title, props.id)
    }

 
    return (
        <div className={s.todoList_inner}>
            <div className={s.header__todolist}>
                <h3>{props.title}</h3>
                <p onClick={deleteTodoList}>x</p>
            </div>
            <AddItemForm additem={createTaskTitle}/>
            <ul>
                { jsxTasks }
            </ul>
            <div>
                <button className={props.filter === "all" ? "active-filter" : ""}
                         onClick={() => { onAllChangeFilter() }}>All</button>

                <button className={props.filter === "active" ? "active-filter" : ""} 
                        onClick={() => { onActiveChangeFilter() }}>Active</button>

                <button className={props.filter === "completed" ? "active-filter" : ""}
                         onClick={() => { onCompletedlChangeFilter() }}>Completed</button>
            </div>
        </div>
    )
};

export default TodoList;