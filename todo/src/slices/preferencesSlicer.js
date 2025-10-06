import { createSlice } from "@reduxjs/toolkit";


const preferencesSlice = createSlice({
    name: 'preferences',
    initialState: {},
    reducers: {
        resetPreferences: (state, action) => {
            state.preferences = action.payload;
        }
    }
});


export const { resetPreferences } = preferencesSlice.actions;
export default preferencesSlice.reducer;