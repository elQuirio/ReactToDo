import { createSelector } from "@reduxjs/toolkit";

function selectAuth (state) {
    return state.auth;
};

export const selectIsLogged = createSelector([selectAuth], (a) => a.isLogged);