import { createSelector } from "@reduxjs/toolkit";

export function selectUiTodos(state) {
    return state.uiTodo.expandedTodo;
}

export function selectSearchBtnToggled(state) {
    return state.uiTodo.searchBtnActive;
}


export const expandedSelector = createSelector([selectUiTodos], (uiTodo) => uiTodo );