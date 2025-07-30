import { configureStore } from '@reduxjs/toolkit';
import todoReducer from '../slices/todoSlicer';

export const store = configureStore({reducer: {todos: todoReducer}});