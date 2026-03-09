import { configureStore } from '@reduxjs/toolkit';
import todoReducer from '../slices/todoSlicer';
import uiReducer from '../slices/uiTodoSlicer';
import preferencesReducer from '../slices/preferencesSlicer';
import authReducer from '../slices/authSlice';

export const store = configureStore({
    reducer: {
        todos: todoReducer,
        uiTodo: uiReducer,
        preferences: preferencesReducer,
        auth: authReducer
    }
});
