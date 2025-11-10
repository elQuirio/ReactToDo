import { createSelector } from "@reduxjs/toolkit";

export function selectUiTodos(state) {
    return state.uiTodo.expandedTodo;
}

export function selectSearchBtnToggled(state) {
    return state.uiTodo.searchBtnActive;
}

export function selectSearchString(state) {
    console.log('search string from store');
    console.log(state.uiTodo.searchString);
    return state.uiTodo.searchString;
}

export const expandedSelector = createSelector([selectUiTodos], (uiTodo) => uiTodo );