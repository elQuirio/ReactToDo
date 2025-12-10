import { createSlice } from "@reduxjs/toolkit";

const storedIsLightMode = localStorage.getItem('isLightMode');

console.log('storedIsLightMode', storedIsLightMode);

const preferencesSlice = createSlice({
    name: 'preferences',
    initialState: {preferences:{"sortDirection": "asc", isLightMode: storedIsLightMode !== null ? storedIsLightMode === 'true' : true }},
    reducers: {
        resetPreferences: (state, action) => {
            console.log(action.payload);
            state.preferences = action.payload;
        }
    }
});


export const { resetPreferences } = preferencesSlice.actions;
export default preferencesSlice.reducer;