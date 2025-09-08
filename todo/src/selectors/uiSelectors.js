import { createSelector } from "@reduxjs/toolkit";

export function selectUiTodos(state) {
    return state.uiTodo.expandedTodo;
}


export const expandedSelector = createSelector([selectUiTodos], (uiTodo) => uiTodo );