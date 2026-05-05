import { createSelector, createSelectorCreator } from "@reduxjs/toolkit";

export function selectPreferences(state) {
    return state.preferences.preferences;
};

export const selectSortDirection = createSelector([selectPreferences], (p) => p.sortDirection);

export const selectSortBy = createSelector([selectPreferences], (p) => p.sortBy);

export const selectIsLightMode = createSelector([selectPreferences], (p) => p.isLightMode === false ? false : true );

export const selectTodoViewMode = createSelector([selectPreferences], (p) => p.todoViewMode);

export const selectMainView = createSelector([selectPreferences], (p) => p.mainView);