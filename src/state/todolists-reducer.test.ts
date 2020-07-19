import { todoListsReducer, RemoveTodoListActionCreactor, AddTodolistActionCreactor, ChangeTodoListTitleActionCreator, ChangeTodoListFilterActionCreator } from './todolists-reducer';
import { TodoListType, FilterValueType } from './../App';
import { v1 } from "uuid"

test('current todolist shoud be removed',() => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "Books", filter: "all"},
        {id: todolistId2, title: "Songs", filter: "active"},
    ];

    const endState = todoListsReducer(startState, RemoveTodoListActionCreactor(todolistId1));
    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2)
});



test('current todolist should be added', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle:string = 'New Todolist';

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "Books", filter: "all"},
        {id: todolistId2, title: "Songs", filter: "active"},
    ];

    const endState = todoListsReducer(startState, AddTodolistActionCreactor(newTodolistTitle));
    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
});


test('current todolist should change its name', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = 'New Todolist';

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "active"},
    ];

    const endState = todoListsReducer(startState, ChangeTodoListTitleActionCreator(newTodolistTitle, todolistId2));
    expect(endState[0].title).toBe('What to learn');
    expect(endState[1].title).toBe(newTodolistTitle);
});


test('current filter of todolist should be changed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();
    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"},
    ];
    let newFilter: FilterValueType = 'completed';
    
    const endState = todoListsReducer(startState, ChangeTodoListFilterActionCreator(newFilter, todolistId2));

    expect(endState[0].filter).toBe('all');
    expect(endState[1].filter).toBe('completed');
})