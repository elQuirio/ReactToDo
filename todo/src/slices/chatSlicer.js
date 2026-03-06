import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    messages: []
};


const chatSlice = createSlice({
    name: 'chat',
    initialState: initialState,
    reducers: {
        addMessage: (state, action) => {
            state.messages = (action.payload);
            },
        updateMessage: (state, action) => {
                state.todos = action.payload;
            },
    }
});


export const { addMessage, updateMessage} = chatSlice.actions;
export default chatSlice.reducer;