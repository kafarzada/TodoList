import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import { FilterValueType } from './App'
import s from './TodoList.module.css'

type TaskType = {
    id: string,
    title:string,
    isDone: boolean
}

type PropsType = {
    id:string
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, todoListId:string)                    => void
    changeFilter: (id: string, value: FilterValueType )            => void
    addTask: (title: string, todoListId:string)                    => void
    changeTaskStauts: (id: string, isDone: boolean, taskId:string) => void
    filter: FilterValueType
}



const TodoList = (props: PropsType) => {

    let [title, setTitle] = useState<string>("");
    let [error, setError] =useState<string | null>(null)


    let jsxTasks = props.tasks.map(t => {
        return <li key={t.id} className={t.isDone ? "is-Done" : ""}>
                    <input type="checkbox"
                            onChange={(e) => {props.changeTaskStauts(t.id, e.currentTarget.checked, props.id)}}
                            checked={t.isDone}/>
                    <span>{t.title}</span>
                    <button onClick={() => { props.removeTask(t.id, props.id) } }>x</button>
              </li>
    });


    const onAddTaskClick = () => {
        if((title.trim()) !== "") { 
            props.addTask(title.trim(), props.id)
            setTitle("")
        } else {
            setError("Title is required")
        }

    }

    const onAllChangeFilter = () => { props.changeFilter( props.id, "all"); }
    const onActiveChangeFilter = () => {  props.changeFilter( props.id, "active"); }
    const onCompletedlChangeFilter = () => { props.changeFilter( props.id, "completed"); }
    const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => { setTitle(e.currentTarget.value) }
    const onKeyPressAddTask = (e: KeyboardEvent) => {
        setError(null)
        if(e.charCode === 13) {
            onAddTaskClick()
        }
    }
 
    return (
        <div className={s.todoList_inner}>
            <h3>{props.title}</h3>
            <div>
                <input 
                    type="text" 
                    value={title} 
                    onChange={ (e) => { onTitleChange(e) }}
                    onKeyPress={ (e) => { onKeyPressAddTask(e) }}
                    className={error ? "error": ""}
                />

                <button onClick={() => { onAddTaskClick() }}>add</button>
                 {error && <div className="error-message">{error}</div> }
            </div>
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