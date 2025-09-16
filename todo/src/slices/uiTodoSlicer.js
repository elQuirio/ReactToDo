import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    //id: true/false
    expandedTodo: {}
};

const uiTodoSlice = createSlice({
    name: 'ui/todos',
    initialState: initialState,
    reducers: {
        collapseAll: (state) => {
            state.expandedTodo = {}
            },
        expandAll: (state, action) => {
            for (const t of action.payload) {
                state.expandedTodo[t] = true;
            }
        },
        toggleId: (state, action) => {
            const id = action.payload.id;
            if (state.expandedTodo[id]) {
                delete state.expandedTodo[id];
            } else {
                state.expandedTodo[id] = true;
            }
        },
        collapseId: (state, action) => {
            delete state.expandedTodo[action.payload.id];
        }
    }
});


export const { collapseAll, expandAll, toggleId, collapseId } = uiTodoSlice.actions;
export default uiTodoSlice.reducer;