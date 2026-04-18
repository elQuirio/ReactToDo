import { createSelector } from "@reduxjs/toolkit";

export function selectMessages(state) {
    return state.messages.messages;
};
