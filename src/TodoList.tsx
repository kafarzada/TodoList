import React, { useState } from 'react';
import { FilterValueType } from './App'

type TaskType = {
    id: string,
    title:string,
    isDone: boolean
}

type PropsType = {
    title: string,
    tasks: Array<TaskType>,
    removeTask: (id: string) => void,
    changeFilter: (value: FilterValueType ) => void,
    addTask: (title: string) => void,
}



const TodoList = (props: PropsType) => {

    let [title, setTitle] = useState<string>("");


    let jsxTasks = props.tasks.map(t => {
        return <li key={t.id}>
                    <input type="checkbox" checked={t.isDone}/>
                    <span>{t.title}</span>
                    <button onClick={() => { props.removeTask(t.id) } }>x</button>
              </li>
    });


    const onAddTask = (title: string) => {
        props.addTask(title)
        setTitle("")
    }


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input type="text" value={title} onChange={(e) => { setTitle(e.currentTarget.value) }} />
                <button onClick={() => { onAddTask(title) }}>add</button>
            </div>
            <ul>
                { jsxTasks }
            </ul>
            <div>
                <button onClick={() => { props.changeFilter("all"); }}>All</button>
                <button onClick={() => { props.changeFilter("active"); }}>Active</button>
                <button onClick={() => { props.changeFilter("completed"); }}>Completed</button>
            </div>
        </div>
    )
};

export default TodoList;