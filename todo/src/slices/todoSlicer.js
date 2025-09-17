import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    todos: []
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
            //const todo = state.todos.find((t) => t.id === action.payload.id);
            const index = state.todos.findIndex((t) => t.id === action.payload.id);
            if ( index !== -1 ) {
                state.todos[index] = action.payload;
                }
            },
        clearCompleted: (state, action) => {
            state.todos = state.todos.filter((t) => t.status !== 'completed');
                },
        resetTodos: (state, action) => {
            state.todos = action.payload;
        },
        markAllAsCompleted: (state, action) => {
            state.todos.map((t) => t.status = 'completed');
        }
    }
});


export const { addTodo, clearAllTodos, toggleTodoStatus, updateTodoText, clearCompleted, resetTodos, updateTodo, markAllAsCompleted } = todoSlice.actions;
export default todoSlice.reducer;