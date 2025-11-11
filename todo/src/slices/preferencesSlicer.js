import { createSlice } from "@reduxjs/toolkit";


const preferencesSlice = createSlice({
    name: 'preferences',
    initialState: {preferences:{"sortDirection": "asc"}},
    reducers: {
        resetPreferences: (state, action) => {
            state.preferences = action.payload;
        }
    }
});


export const { resetPreferences } = preferencesSlice.actions;
export default preferencesSlice.reducer;