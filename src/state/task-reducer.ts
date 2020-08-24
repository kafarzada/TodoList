import {TasksStateType, TaskType} from '../App';
import { AddTodoListActionType, RemoveTodoListActionType } from './todolists-reducer';

export type RemoveActionType = {
    type: 'REMOVE-TASK'
    taskId: string
    todolistId: string
}

export type AddTaskActionType = {
    type:'ADD-TASK'
    title: string
    todolistId: string
}

type ChangeTaskStatusActionType = {
    type: "CHANGE-TASK-STATUS"
    taskId: string
    isDone: boolean
    todolistId: string
}

type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE',
    taskId: string
    newTitle: string
    todolistId: string
}

type ActionType = RemoveActionType
                | AddTaskActionType
                | ChangeTaskStatusActionType
                | ChangeTaskTitleActionType
                | AddTodoListActionType
                | RemoveTodoListActionType

                
let initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
    let copyState = {...state}
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(item => item.id !== action.taskId)
            }

        case 'ADD-TASK':
            let newTask:TaskType = {id: action.todolistId, title: action.title, isDone: false}
            return {
                ...state,
                [action.todolistId]: [newTask, ...state[action.todolistId]]
            }

        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map( item => {
                    if(item.id === action.taskId) {
                        return {...item, isDone: action.isDone}
                    } else {
                        return item
                    }
                })
            }

        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(item => {
                    if(item.id === action.taskId) {
                        return {...item, title: action.newTitle}
                    } else {
                        return item
                    }
                })
            }

        case 'ADD-TODOLIST':
            return {
                ...state,
                [action.todoListId]: []
            }


        case 'REMOVE-TODOLIST':
            delete copyState[action.id]
            return copyState
    
        default:
            return state
    }
}


export const removeTasksActionCreator = (taskId: string, todoListId:string):RemoveActionType => {
    return {
        type: 'REMOVE-TASK',
        taskId: taskId,
        todolistId: todoListId
    }
}
export const addTaskActionCreator = (title: string, todolistId: string): AddTaskActionType => {
    return {
        type: 'ADD-TASK',
        title: title,
        todolistId: todolistId
    }
}
export const changeTaskStatusActionCreator = (taskId: string, status: boolean, todolistId: string): ChangeTaskStatusActionType => {
    return {
        type: 'CHANGE-TASK-STATUS',
        taskId: taskId,
        isDone: status,
        todolistId: todolistId
    }
}
export const changeTaskTitleActionCreator = (taskId: string, newTitle: string, todolistId: string): ChangeTaskTitleActionType => {
    return {
        type: 'CHANGE-TASK-TITLE',
        taskId: taskId,
        newTitle: newTitle,
        todolistId: todolistId
    }
}

