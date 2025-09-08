import { configureStore } from '@reduxjs/toolkit';
import todoReducer from '../slices/todoSlicer';
import uiReducer from '../slices/uiTodoSlicer';

export const store = configureStore({
    reducer: {
        todos: todoReducer,
        uiTodo: uiReducer
    }
});
