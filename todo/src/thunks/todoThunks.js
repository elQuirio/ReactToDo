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
        dispatch(addTodo(data));
    }
);

// capire se si puo accorpare completed e all e gestione errori
export const clearTodos = createAsyncThunk(
    "todos/clearTodos",
    async ( _ , { dispatch }) => {
        const res = await fetch('http://localhost:3000/api/todos',
            {
                method: "DELETE",
                headers: { "Content-Type": "application/json" }
            });
        const data = await res.json();
        dispatch(resetTodos(data));
    }
);

export const clearCompletedTodos = createAsyncThunk(
    "todos/clearCompletedTodos",
    async ( _ , { dispatch }) => {
        const res = await fetch('http://localhost:3000/api/todos?status=completed', {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        });
        const data = await res.json();
        dispatch(resetTodos(data));
    }
);

// capire se possibile accorpare
export const markAllAsCompletedTodos = createAsyncThunk(
    'todos/markAllAsCompleted',
    async ( _ , { dispatch }) => {
        const res = await fetch('http://localhost:3000/api/todos/mark-all-as-completed', {
            method: "PATCH",
            headers: { "Content-Type": "application/json" }
        })
        const data = await res.json();
        dispatch(resetTodos(data));
    }
);

export const markAllAsActiveTodos = createAsyncThunk(
    'todos/markAllAsActive',
    async (_ , { dispatch} ) => {
        const res = await fetch('http://localhost:3000/api/todos/mark-all-as-active', {
            method: 'PATCH',
            headers: { "Content-Type": "application/json" }
        })
        const data = await res.json();
        dispatch(resetTodos(data));
    }
);


export const sortByTodos = createAsyncThunk(
    'todos/sortByDirection', 
    async ( {sortDirection, sortBy},  { dispatch } ) => {
        const res = await fetch(`http://localhost:3000/api/todos`, { 
            method: 'PATCH', 
            headers: { 'Content-Type': 'application/json' }, 
            body: JSON.stringify({ "sortDirection": sortDirection , "sortBy": sortBy }) 
        })
        const sortedTodos = await res.json();
        dispatch(resetTodos(sortedTodos));
    }
);

export const dragAndDropReorderTodos = createAsyncThunk("todos/dragAndDropReorder", async ({fromId, toId}, {dispatch}) => {
    const res = await fetch('http://localhost:3000/api/todos/reorder', {
        method: 'PATCH', 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({fromId, toId})
    })
    // aggiungere il reset dei todo con la response
    const sortedTodos = await res.json();
    dispatch(resetTodos(sortedTodos));
});