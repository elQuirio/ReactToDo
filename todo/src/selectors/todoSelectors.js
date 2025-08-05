import { createSelector } from "@reduxjs/toolkit";

export function selectTodos(state) {
    return state.todos.todos;
};

export const selectActiveTodos = createSelector( [selectTodos], (todos) => todos.filter( (t) => t.status === 'active'));

export const selectCompletedTodos = createSelector( [selectTodos], (todos) => todos.filter((t) => t.status === 'completed'));