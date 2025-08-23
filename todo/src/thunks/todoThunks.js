import { createAsyncThunk } from '@reduxjs/toolkit';
import { addTodo, resetTodos, updateTodo } from '../slices/todoSlicer';

export const fetchTodos = createAsyncThunk(
    "todos/fetchTodos", 
    async ( _ , { dispatch }) => {
        const res = await fetch('http://localhost:3000/api/todos');
        const data = await res.json();
        dispatch(resetTodos(data));
    }
);


export const saveTodo = createAsyncThunk(
    "todos/saveTodo",
    async ( todo , { dispatch }) => {
        const res = await fetch('http://localhost:3000/api/todos', {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(todo)
        });
        const data = await res.json();
        dispatch(updateTodo(data));
    }
);


export const insertTodo = createAsyncThunk(
    "todos/insertTodo",
    async (todo, { dispatch }) => {
        const res = await fetch('http://localhost:3000/api/todos', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(todo)
            });
        const data = await res.json();
        console.log(data);
        dispatch(addTodo(data));
    }
);