
import { combineReducers, createStore } from "redux";
import { todoListsReducer } from "./todolists-reducer";
import { tasksReducer } from "./task-reducer";

//объединяем редьюссеры с помощью метода combineReducers
// задаем струтру нашего единственного объекта состояния
const rootReducer = combineReducers({
    todolists: todoListsReducer,
    tasks: tasksReducer
})
// создаем  store
export const store = createStore(rootReducer);

// определить автоматически тип всего приложения
export type AppRootStoreType = ReturnType<typeof rootReducer>


// обратится в консоли браузе в store в любой момент
//window.store = store