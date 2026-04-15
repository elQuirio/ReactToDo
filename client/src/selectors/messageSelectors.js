import { createSelector } from "@reduxjs/toolkit";

export function selectMessages(state) {
    console.log(state.messages.messages);
    return state.messages.messages;
};
