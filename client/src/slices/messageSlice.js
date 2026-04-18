import { createSlice } from "@reduxjs/toolkit";
import { askChat } from "../thunks/chatThunks";

const initialState = {
    messages: [],
    error: null,
    asking: false
};

const messageSlice = createSlice({ 
    name: 'message',
    initialState: initialState,
    reducers: {
        addMessage(state, action) {
            state.messages.push(action.payload);
        },
        resetMessages(state, action) {
            state.messages = action.payload;
        },
        addTempMessages(state, action) {
            state.messages.push(...action.payload);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(askChat.pending, (state) => {
            state.asking = true;
            state.error = null;
        }),
        builder.addCase(askChat.fulfilled, (state, action) => {
            state.asking = false;
            state.error = null;
            const { tmpUserMsgId, tmpAssistantMsgId, messages } = action.payload;
            state.messages = state.messages.filter(m => (m.messageId !== tmpUserMsgId) && (m.messageId !== tmpAssistantMsgId));
            state.messages.push( ...messages )
        }),
        builder.addCase(askChat.rejected, (state, action) => {
            state.asking = false;
            state.error = 'Error'
            const { tmpAssistantMsgId } = action.payload;
            state.messages = state.messages.filter(m => m.messageId !== tmpAssistantMsgId);
        })
    }
});


export const { addMessage, resetMessages, addTempMessages } = messageSlice.actions;
export default messageSlice.reducer;