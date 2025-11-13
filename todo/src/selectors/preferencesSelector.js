import { createSelector } from "@reduxjs/toolkit";

export function selectPreferences(state) {
    return state.preferences.preferences;
};

export const selectSortDirection = createSelector([selectPreferences], (p) => p.sortDirection);

export const selectSortBy = createSelector([selectPreferences], (p) => p.sortBy);