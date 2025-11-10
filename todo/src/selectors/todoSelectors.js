import { createSelector } from "@reduxjs/toolkit";
import { selectSearchString } from "./uiSelectors";

export function selectTodos(state) {
    return state.todos.todos;
};

export const selectActiveTodos = createSelector( [selectTodos], (todos) => todos.filter( (t) => t.status === 'active'));

export const selectCompletedTodos = createSelector( [selectTodos], (todos) => todos.filter((t) => t.status === 'completed'));

export const selectOverdueTodos = createSelector( [selectTodos], (todos) => todos.filter((t) => t.toBeCompletedAt && t.toBeCompletedAt < Date.now() ));

export const selectSearchedTodo = createSelector( [selectTodos, selectSearchString], (todos, searchString) => {
    if (searchString === "") {
        return todos;
    } else {
        console.log('test string');
        console.log(searchString);
        const query = searchString.trim().toLowerCase();
        return todos.filter((t) => t.text.toLowerCase().includes(query));
    }
});