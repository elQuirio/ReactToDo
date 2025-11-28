import { createSlice } from "@reduxjs/toolkit";
import { checkLogin, loginUser } from "../thunks/authThunks";

const initialState = {
    user: null,
    userId: null,
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
            state.userId = null;
            state.isLogged = false;
            state.loading = false;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state) => {
            state.user = null;
            state.userId = null;
            state.isLogged = false;
            state.loading = true;
            state.error = null;
        })
        .addCase(loginUser.rejected, (state, action)=> {
            state.user = null;
            state.userId = null;
            state.isLogged = false;
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(loginUser.fulfilled, (state,action) => {
            state.user = action.payload.email;
            state.userId = action.payload.userId;
            state.isLogged = true;
            state.loading = false;
            state.error = null;
        })
        .addCase(checkLogin.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(checkLogin.rejected, (state, action) => {
            state.user = null;
            state.userId = null;
            state.isLogged = false;
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(checkLogin.fulfilled, (state, action) => {
            if (action.payload.isLogged) {
                state.user = action.payload.email;
                state.userId = action.payload.userId;
                state.isLogged = true;
                state.loading = false;
                state.error = null;
            } else {
                state.user = null;
                state.userId = null;
                state.isLogged = false;
            }
        })
    }
});


export const { logout } = authSlice.actions;
export default authSlice.reducer;