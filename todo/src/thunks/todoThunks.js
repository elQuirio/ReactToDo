import { createAsyncThunk, isRejectedWithValue } from '@reduxjs/toolkit';
import { addTodo, resetTodos, updateTodo } from '../slices/todoSlicer';

export const fetchTodos = createAsyncThunk(
    "todos/fetchTodos", 
    async ( _ , { dispatch, rejectWithValue }) => {
        try {
            const res = await fetch('http://localhost:3000/api/todos', {credentials: 'include',});
            const data = await res.json();
            if (!res.ok) {
                return rejectWithValue(data.message || "Server error fetching todos!");
            }
            dispatch(resetTodos(data.data));
        } catch (e) {
            return rejectWithValue(e.message || "Error fetching todos!");
        }
    }
);


export const saveTodo = createAsyncThunk(
    "todos/saveTodo",
    async ( todo , { dispatch, rejectWithValue }) => {
        try {
            const res = await fetch('http://localhost:3000/api/todos', {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(todo),
                credentials: 'include',
            });
            const data = await res.json();
            if (!res.ok) {
                return rejectWithValue(data.message || "Server error saving todo!");
            }
            dispatch(updateTodo(data.data));
        } catch (e) {
            return rejectWithValue(e.message || "Error saving todo!");
        }
    }
);


export const insertTodo = createAsyncThunk(
    "todos/insertTodo",
    async (todo, { dispatch, rejectWithValue }) => {
        try {
            const res = await fetch('http://localhost:3000/api/todos', {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(todo),
                    credentials: 'include',
                });
            const data = await res.json();
            if (!res.ok) {
                return rejectWithValue(data.message || "Server error adding todo!")
            }
            dispatch(addTodo(data.data));
        } catch (e) {
            return rejectWithValue(e.message || "Error adding todo!");
        }
});

// capire se si puo accorpare completed e all e gestione errori
export const clearTodos = createAsyncThunk(
    "todos/clearTodos",
    async ( _ , { dispatch, rejectWithValue }) => {
        try {
            const res = await fetch('http://localhost:3000/api/todos',
                {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                    credentials: 'include',
                });
            const data = await res.json();
            if (!res.ok) {
                return rejectWithValue(data.message || "Server error clearing todos!");
            }
            dispatch(resetTodos(data.data));
        } catch (e) {
            return rejectWithValue(e.message || "Error clearing todos!");
        }
});

export const clearCompletedTodos = createAsyncThunk(
    "todos/clearCompletedTodos",
    async ( _ , { dispatch, rejectWithValue }) => {
        try {
        const res = await fetch('http://localhost:3000/api/todos?status=completed', {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            credentials: 'include',
        });
        const data = await res.json();
        if(!res.ok) {
            return rejectWithValue(data.message || "Server error clearing completed todos!");
        }
        dispatch(resetTodos(data.data));
    } catch (e) {
        return rejectWithValue(e.message || "Error clearing completed todos!");
    }
});

// capire se possibile accorpare
export const markAllAsCompletedTodos = createAsyncThunk(
    'todos/markAllAsCompleted',
    async ( _ , { dispatch, rejectWithValue }) => {
        try {
            const res = await fetch('http://localhost:3000/api/todos/mark-all/completed', {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                credentials: 'include',
            })
            const data = await res.json();
            if (!res.ok) {
                return rejectWithValue(data.message || "Server error marking all todos as completed!");
            }
            dispatch(resetTodos(data.data));
        } catch (e) {
            return rejectWithValue(e.message || "Error marking all todos as completed!");
        }
});

export const markAllAsActiveTodos = createAsyncThunk(
    'todos/markAllAsActive',
    async (_ , { dispatch, rejectWithValue} ) => {
        try {
            const res = await fetch('http://localhost:3000/api/todos/mark-all/active', {
                method: 'PATCH',
                headers: { "Content-Type": "application/json" },
                credentials: 'include',
            })
            const data = await res.json();
            if (!res.ok) {
                return rejectWithValue(e.message || "Server error marking all todos as active!");
            }
            dispatch(resetTodos(data.data));
        } catch (e) {
            return rejectWithValue(e.message || "Error marking all todos as active!");
        }
    }
);


export const sortByTodos = createAsyncThunk(
    'todos/sortByDirection', 
    async ( {sortDirection, sortBy},  { dispatch, rejectWithValue } ) => {
        try {
            const res = await fetch(`http://localhost:3000/api/todos`, { 
                method: 'PATCH', 
                headers: { 'Content-Type': 'application/json' }, 
                credentials: 'include',
                body: JSON.stringify({ "sortDirection": sortDirection , "sortBy": sortBy }) 
            })
            const data = await res.json();
            if (!res.ok) {
                return rejectWithValue(data.message || "Server error sorting todos!");
            }
            dispatch(resetTodos(data.data));
        } catch (e) {
            return rejectWithValue(e.message || "Error sorting todos!");
        }
    }
);

export const dragAndDropReorderTodos = createAsyncThunk("todos/dragAndDropReorder", 
    async ({fromId, toId}, { dispatch, rejectWithValue }) => {
        try {
            const res = await fetch('http://localhost:3000/api/todos/reorder', {
                method: 'PATCH', 
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({fromId, toId}),
                credentials: 'include',
            })
            const data = await res.json();
            if (!res.ok) {
                return rejectWithValue(data.message || "Server error reordering todos!");
            }
            dispatch(resetTodos(data.data));
        } catch (e) {
            return rejectWithValue(e.message || "Error reordering todos!");
        }
});