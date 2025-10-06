import { createSelector } from "@reduxjs/toolkit";

export function selectPreferences(state) {
    return state.preferences.preferences;
};


export const selectUserPreferences = createSelector([selectPreferences], (p) => p);
