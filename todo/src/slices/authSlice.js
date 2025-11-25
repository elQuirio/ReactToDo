import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "../thunks/authThunks";

const initialState = {
    user: null,
    isLogged: false,
    loading: false,
    error: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.isLogged = false;
            state.loading = false;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state) => {
            state.user = null;
            state.isLogged = false;
            state.loading = true;
            state.error = null;
        })
        .addCase(loginUser.rejected, (state, action)=> {
            state.user = null;
            state.isLogged = false;
            state.loading = false;
            state.error =action.payload;
        })
        .addCase(loginUser.fulfilled, (state,action) => {
            state.user = action.payload.email;
            state.isLogged = true;
            state.loading = false;
            state.error = null;
        })
    }
});


export const { logout } = authSlice.actions;
export default authSlice.reducer;