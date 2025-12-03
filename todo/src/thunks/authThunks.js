import { createAsyncThunk } from "@reduxjs/toolkit";

export const registerUser = createAsyncThunk('auth/registerUser', 
    async ( credentials, { rejectWithValue }) => {
        try {
            const resp = await fetch('http://localhost:3000/api/auth/register', {   
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: 'include',
                body: JSON.stringify(credentials)
             });
            const respRegister = await resp.json();
            if (!resp.ok) {
                return rejectWithValue(respRegister.message || 'registration unsuccessful!');
            }
            return respRegister;
        } catch (e) {
            return rejectWithValue(e.message || 'Internal error!');
        }
});

export const loginUser = createAsyncThunk('auth/loginUser',
    async (credentials , { rejectWithValue }) => {
        try {
            const resp = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                credentials: 'include',
                body: JSON.stringify(credentials)
            });
            const respLogin = await resp.json();
            if (!resp.ok) {
                return rejectWithValue(respLogin.message || 'Login unsuccessful!');
            }
            return respLogin;
        } catch (e) {
            return rejectWithValue(e.message || 'Internal error!');
    }
});


export const checkLogin = createAsyncThunk('auth/checkAuth', 
    async ( _, { rejectWithValue } ) => {
        try {
            const resp = await fetch('http://localhost:3000/api/auth/checkAuth', {
                method: 'GET',
                credentials: 'include',
            });
            const data = await resp.json();
            if (!resp.ok) {
                return rejectWithValue(data.message|| 'Auth check failed!');
            }
            return data;
        } catch (e) {
            return rejectWithValue(e.message || 'Check login failed!');
        }
});


export const logoutUser = createAsyncThunk('auth/logout', 
    async ( _ , { rejectWithValue }) => {
        try {
            const resp = await fetch('http://localhost:3000/api/auth/logout', {
                method: 'POST',
                credentials: 'include',
            });
            const data = await resp.json()
            if (!resp.ok) { //modificare anche negli altri dopo aver adattato i messaggi nelle rotte
                return rejectWithValue(data.message || 'Logout failed!');
            }
            return data;
        }
        catch (e) {
            return rejectWithValue(e.message || 'Logout failed!');
        }
});