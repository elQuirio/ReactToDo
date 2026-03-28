import { createAsyncThunk } from '@reduxjs/toolkit';
import { addTodo, resetTodos, updateTodo } from '../slices/todoSlicer';
import { API_BASE_URL } from '../config/api';

export const fetchTodos = createAsyncThunk(
    "todos/fetchTodos", 
    async ( _ , { dispatch, rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_BASE_URL}/api/todos`, {
                method: 'GET',
                headers: token ? {Authorization: `Bearer ${token}`} : {},
            });
            
            const data = await res.json();
            if (res.status === 401) {
                localStorage.removeItem('token');
                return rejectWithValue(data.message || "Error fetching todos!");
            }

            if (!res.ok) {
                return rejectWithValue(data.message || "Error fetching todos!");
            }
            dispatch(resetTodos(data.data));

        } catch (e) {
            return rejectWithValue(e.message || "Error fetching todos!");
        }
    }
);


export const saveTodo = createAsyncThunk(
    "todos/saveTodo",
    async ( {todoId, todo} , { dispatch, rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_BASE_URL}/api/todos/${todoId}`, {
                method: "PATCH",
                headers: { 
                    "Content-Type": "application/json",
                    ...(token && {Authorization: `Bearer ${token}`})
                },
                body: JSON.stringify(todo),
            });

            const data = await res.json();

            if (res.status === 401 ) {
                localStorage.removeItem('token');
                return rejectWithValue(data.message || "Error saving todo!");
            }

            if (!res.ok) {
                return rejectWithValue(data.message || "Error saving todo!");
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
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_BASE_URL}/api/todos`, {
                    method: "POST",
                    headers: { 
                        "Content-Type": "application/json",
                        ...(token && {Authorization: `Bearer ${token}`})
                    },
                    body: JSON.stringify(todo),
                });

            const data = await res.json();

            if (res.status === 401) {
                localStorage.removeItem('token');
                return rejectWithValue(data.message || "Error adding todo!");
            }

            if (!res.ok) {
                return rejectWithValue(data.message || "Error adding todo!");
            }
            dispatch(addTodo(data.data));
        } catch (e) {
            return rejectWithValue(e.message || "Error adding todo!");
        }
});


export const clearTodos = createAsyncThunk(
    "todos/clearTodos",
    async ( status , { dispatch, rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_BASE_URL}/api/todos?status=${status}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        ...(token && {Authorization: `Bearer ${token}`})
                    },
                });

            const data = await res.json();

            if (res.status === 401) {
                localStorage.removeItem('token');
                return rejectWithValue(data.message || "Error clearing todos!");
            }
            if (!res.ok) {
                return rejectWithValue(data.message || "Error clearing todos!");
            }
            dispatch(resetTodos(data.data));

        } catch (e) {
            return rejectWithValue(e.message || "Error clearing todos!");
        }
});


export const markAllAsCompletedTodos = createAsyncThunk(
    'todos/markAllAsCompleted',
    async ( _ , { dispatch, rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_BASE_URL}/api/todos/mark-all/completed`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    ...(token && {Authorization: `Bearer ${token}`})
                    },
            })
            const data = await res.json();

            if (res.status === 401) {
                localStorage.removeItem('token');
                return rejectWithValue(data.message || "Error marking all todos as completed!");
            }

            if (!res.ok) {
                return rejectWithValue(data.message || "Error marking all todos as completed!");
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
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_BASE_URL}/api/todos/mark-all/active`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                    ...(token && {Authorization: `Bearer ${token}`})
                },
            })
            const data = await res.json();

            if (res.status === 401) {
                localStorage.removeItem('token');
                return rejectWithValue(data.message || "Error marking all todos as active!");
            }

            if (!res.ok) {
                return rejectWithValue(e.message || "Error marking all todos as active!");
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
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_BASE_URL}/api/todos/resort`, { 
                method: 'PATCH', 
                headers: {
                    "Content-Type": "application/json",
                    ...(token && {Authorization: `Bearer ${token}`})
                },
                body: JSON.stringify({ "sortDirection": sortDirection , "sortBy": sortBy }) 
            })
            const data = await res.json();

            if (res.status === 401) {
                localStorage.removeItem('token');
                return rejectWithValue(data.message || "Error sorting todos!");
            }
            if (!res.ok) {
                return rejectWithValue(data.message || "Error sorting todos!");
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
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_BASE_URL}/api/todos/reorder`, {
                method: 'PATCH', 
                headers: {
                    "Content-Type": "application/json",
                    ...(token && {Authorization: `Bearer ${token}`})
                },
                body: JSON.stringify({fromId, toId}),
            })
            const data = await res.json();

            if (res.status === 401) {
                localStorage.removeItem('token');
                return rejectWithValue(data.message || "Error reordering todos!");
            }
            if (!res.ok) {
                return rejectWithValue(data.message || "Error reordering todos!");
            }
            dispatch(resetTodos(data.data));
        } catch (e) {
            return rejectWithValue(e.message || "Error reordering todos!");
        }
});