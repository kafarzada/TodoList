import { todoListsReducer, RemoveTodoListActionCreactor, AddTodolistActionCreactor, ChangeTodoListTitleActionCreator, ChangeTodoListFilterActionCreator } from './todolists-reducer';
import { TodoListType, FilterValueType } from './../App';
import { v1 } from "uuid"
import { tasksReducer } from './task-reducer';

let todolistId1: string;
let todolistId2: string;
let startState: Array<TodoListType>;

beforeEach(() => { //  после каждого теста вызывается
     todolistId1 = v1();
     todolistId2 = v1();

    startState = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "Songs", filter: "active"},
    ];
})

test('correct todolist shoud be removed',() => {

    const endState = todoListsReducer(startState, RemoveTodoListActionCreactor(todolistId1));
    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2)
});



test('correct todolist should be added', () => {
    let newTodolistTitle:string = 'New Todolist';
    const StartTasks = {}
    let action =  AddTodolistActionCreactor(newTodolistTitle)

    const endState = todoListsReducer(startState, action);
    const EndStateTasks = tasksReducer(StartTasks, action)

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
    expect(endState[2].filter).toBe('all');
    expect(endState[2].id).toBeDefined();
    expect(endState[2].id).toBe(Object.keys(EndStateTasks)[0]);
});


test('current todolist should change its name', () => {
    let newTodolistTitle = 'New Todolist';

    const endState = todoListsReducer(startState, ChangeTodoListTitleActionCreator(newTodolistTitle, todolistId2));
    expect(endState[0].title).toBe('What to learn');
    expect(endState[1].title).toBe(newTodolistTitle);
});


test('current filter of todolist should be changed', () => {
    let newFilter: FilterValueType = 'completed';
    const endState = todoListsReducer(startState, ChangeTodoListFilterActionCreator(newFilter, todolistId2));

    expect(endState[0].filter).toBe('all');
    expect(endState[1].filter).toBe('completed');
});


