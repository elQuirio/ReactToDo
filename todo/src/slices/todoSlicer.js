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
            console.log(state.todos);
            },
        clearAllTodos:  (state) => {
            state.todos = [];
            }
        }
    });


export const { addTodo, clearAllTodos } = todoSlice.actions;
export default todoSlice.reducer;