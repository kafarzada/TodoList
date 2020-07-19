import {TodoListType, FilterValueType} from './../App'
import { v1 } from 'uuid';

export type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}

export type AddTodoListActionType = {
    type:'ADD-TODOLIST'
    title: string
}

export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    title: string
    id: string
}

export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    filter: FilterValueType
    id: string
}

type ActionType = RemoveTodoListActionType |
                  AddTodoListActionType |
                  ChangeTodolistTitleActionType |
                  ChangeTodolistFilterActionType


export const todoListsReducer = (state: Array<TodoListType>, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(item => item.id !== action.id);
        case 'ADD-TODOLIST':
            let newTodoList: TodoListType = {
                id: v1(),
                title: action.title,
                filter: 'all'
            };
            return [...state, newTodoList];
        case 'CHANGE-TODOLIST-TITLE':
            const todoList = state.find(item => item.id === action.id);
            if(todoList) {
                todoList.title = action.title;
                return [...state]
            }
            return state;
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(item=> {
                if(item.id === action.id)
                    item.filter = action.filter;
                
                return item;
            })
        default:
            throw new Error("I don't understand this type");
    }
}


export const RemoveTodoListActionCreactor = (todoListId: string): RemoveTodoListActionType => {
    return {
        type: 'REMOVE-TODOLIST',
        id: todoListId
    }
}

export const AddTodolistActionCreactor = (newTitle: string):AddTodoListActionType => {
    return {
        type:'ADD-TODOLIST',
        title: newTitle
    }
}

export const ChangeTodoListTitleActionCreator = (newTitle: string, todoListId: string):ChangeTodolistTitleActionType => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        title: newTitle,
        id: todoListId
    }
}

export const ChangeTodoListFilterActionCreator = (filter: FilterValueType, todoListId: string):ChangeTodolistFilterActionType => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        filter: filter,
        id: todoListId
    }
}