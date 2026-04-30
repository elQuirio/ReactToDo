import { createSelector } from "@reduxjs/toolkit";

export function selectMessagesState(state) {
    return state.messages;
};

export const selectMessages = createSelector([selectMessagesState], (m) => m.messages);

export const selectIsAsking = createSelector([selectMessagesState], (m) => m.asking);