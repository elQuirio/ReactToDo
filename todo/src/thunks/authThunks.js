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
            console.log(resp);
            if (!resp.ok) {
                console.log('RESP not ok');
                return rejectWithValue(respRegister.error);
            }
            console.log(respRegister);
            return respRegister;
        } catch (e) {
            return rejectWithValue(e);
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
                console.log('RESP not ok');
                return rejectWithValue(respLogin.error);
            }
            console.log(respLogin);
            return respLogin;
        } catch (e) {
            return rejectWithValue(e);
    }
});


export const checkLogin = createAsyncThunk('auth/checkAuth', 
    async ( _ ) => {
        try {
            const resp = await fetch('http://localhost:3000/api/auth/checkAuth', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });
            const data = await resp.json();
            if (!resp.ok) {
                return rejectWithValue(data.error|| 'Auth check failed!');
            }
            return data;
        } catch (e) {
            return rejectWithValue(e);
        }
});