import { configureStore } from '@reduxjs/toolkit';
import todoReducer from '../slices/todoSlicer';
import { selectTodos } from '../selectors/todoSelectors';

export const store = configureStore({reducer: {todos: todoReducer}});

store.subscribe(() => {
    try {
        const todos = store.getState().todos.todos;
        localStorage.setItem("savedTodos", JSON.stringify(todos));
    } catch {}
});