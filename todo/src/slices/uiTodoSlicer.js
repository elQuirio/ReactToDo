import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    expandedTodo: {},
    searchBtnActive: false,
    chatButtonActive: false,
    searchString: ""
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
        },
        searchBtnToggle: (state) => {
            state.chatButtonActive = false;
            state.searchBtnActive = !state.searchBtnActive;
        },
        chatButtonToggle: (state) => {
            state.searchBtnActive = false;
            state.chatButtonActive = !state.chatButtonActive;
        },
        updateSearchString: (state, action) => {
            state.searchString = action.payload.text;
        }
    }
});


export const { collapseAll, expandAll, toggleId, collapseId , searchBtnToggle, chatButtonToggle, updateSearchString} = uiTodoSlice.actions;
export default uiTodoSlice.reducer;