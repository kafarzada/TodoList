import React from 'react';


export type TaskType = {
    id: number,
    title:string,
    isDone: boolean
}

type PropsType = {
    title: string,
    tasks: Array<TaskType>
}



const TodoList = (props: PropsType) => {

    let jsxTasks = props.tasks.map(t => {
        return <li key={t.id}>
                    <input type="checkbox" checked={t.isDone}/>
                    <span>{t.title}</span>
                    <button onClick={() => {alert(t.id)}}>x</button>
              </li>
    });


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                { jsxTasks }
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
};

export default TodoList;