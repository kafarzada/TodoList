import {TodoListType, FilterValueType} from './../App'
import { v1 } from 'uuid';

type ActionType = {
    type: string
    [key: string] : any
}

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
            
        default:
            throw new Error("I don't understand this type");
    }
}