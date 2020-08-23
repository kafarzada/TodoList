import {
    tasksReducer,
    removeTasksActionCreator,
    addTaskActionCreator,
    changeTaskStatusActionCreator, changeTaskTitleActionCreator
} from './task-reducer';
import { TasksStateType, TodoListType } from "../App"
import { AddTodolistActionCreactor, RemoveTodoListActionCreactor, todoListsReducer } from './todolists-reducer';

let startState:TasksStateType;

beforeEach(() => { //  после каждого теста вызывается
     startState = {
        "todolistId1": [
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "React", isDone: false }
        ],
        "todolistId2": [
            { id: "1", title: "bread", isDone: false },
            { id: "2", title: "milk", isDone: true },
            { id: "3", title: "tea", isDone: false }
        ]
    };
})

test('correct task should be deleted from correct array', () => {
    const action = removeTasksActionCreator('2', 'todolistId2');
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(2)
    expect(endState['todolistId2'].every(t => t.id != "2")).toBeTruthy()
    expect(endState['todolistId2'][1].id).toBe("3")
})

test('current task should be added to correct array', () => {
    const action = addTaskActionCreator("juce", "todolistId2")
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][0].id).toBeDefined();
    expect(endState['todolistId2'][0].title).toBe('juce')
    expect(endState['todolistId2'][0].isDone).toBe(false)
})

test('status of specified task should be changed', () => {
    const action = changeTaskStatusActionCreator("2", false, "todolistId2")
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][1].isDone).toBe(false)
})

test('title of specified task should be changed', () => {
    const action = changeTaskTitleActionCreator("2", "React", "todolistId2")
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][1].title).toBe("React")
})


test('new array should be added when new todolistIs added' ,() => {
    let startTodoList: Array<TodoListType> = []
    const action = AddTodolistActionCreactor('new TodoList');
    const endState = tasksReducer(startState, action);
    const endStateTodoList = todoListsReducer(startTodoList, action)

    const keys = Object.keys(endState);
    const newKey = keys.find( item => item != 'todolistId1' && item != 'todolistId2')

    if(!newKey) {
        throw Error('new key should be added');
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([]);
    expect(endStateTodoList[0].id).toBe(newKey);

});

test('array should be deleted when todolist deleted' ,() => {
    const action = RemoveTodoListActionCreactor('todolistId2');
    const endState = tasksReducer(startState, action);
    const keys = Object.keys(endState);

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).toBeUndefined()


});