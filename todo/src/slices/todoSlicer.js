import { createSlice } from '@reduxjs/toolkit';

const loadSavedTodos = () => {
    try {
        const raw = localStorage.getItem('savedTodos');
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
};

const initialState = {
    todos: loadSavedTodos()
};


const todoSlice = createSlice({
    name: 'todo',
    initialState: initialState,
    reducers: {
        addTodo: (state, action) => {
            state.todos.push(action.payload);
            },
        clearAllTodos:  (state) => {
            state.todos = [];
            },
        toggleTodoStatus: (state, action) => {
            const todo = state.todos.find(t => t.id === action.payload.id);
            if (todo.status === 'active') {
                todo.status = 'completed';
            } else {
                todo.status = 'active';
            }},
        updateTodo: (state, action) => {
            const todo = state.todos.find((t) => t.id === action.payload.id);
            if (todo) {
                todo.status = action.payload.status;
                todo.text = action.payload.text;
                }
            },
        clearCompleted: (state, action) => {
            state.todos = state.todos.filter((t) => t.status !== 'completed');
                },
        resetTodos: (state, action) => {
            state.todos = action.payload;
        }
            }
    });


export const { addTodo, clearAllTodos, toggleTodoStatus, updateTodoText, clearCompleted, resetTodos, updateTodo } = todoSlice.actions;
export default todoSlice.reducer;