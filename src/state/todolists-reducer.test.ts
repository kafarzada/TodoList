import { todoListsReducer } from './todolists-reducer';
import { TodoListType } from './../App';
import { v1 } from "uuid"

test('current todolist shoud be removed',() => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "Books", filter: "all"},
        {id: todolistId2, title: "Songs", filter: "active"},
    ];

    const endState = todoListsReducer(startState, {type: 'REMOVE-TODOLIST', id: todolistId1});
    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2)
});



test('current todolist should be added', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolitTitle = 'New Todolist';

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "Books", filter: "all"},
        {id: todolistId2, title: "Songs", filter: "active"},
    ];

    const endState = todoListsReducer(startState, {type: 'ADD-TODOLIST', title: newTodolitTitle});
    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolitTitle);
    
})