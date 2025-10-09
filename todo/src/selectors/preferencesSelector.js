import { createSelector } from "@reduxjs/toolkit";

export function selectPreferences(state) {
    console.log('Current state prefs');
    console.log(state.preferences.preferences)
    return state.preferences.preferences;
};

export const selectSortDirection = createSelector([selectPreferences], (p) => p.sortDirection);