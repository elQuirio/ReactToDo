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
            console.log(state.todos);
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
        updateTodoText: (state, action) => {
            const todo = state.todos.find((t) => t.id === action.payload.id);
            if (todo) {
                todo.text = action.payload.text;
                }
            }
        }
    }
);


export const { addTodo, clearAllTodos, toggleTodoStatus, updateTodoText } = todoSlice.actions;
export default todoSlice.reducer;