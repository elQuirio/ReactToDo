import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_BASE_URL } from "../config/api";

export const registerUser = createAsyncThunk('auth/registerUser', 
    async ( credentials, { rejectWithValue }) => {
        try {
            const resp = await fetch(`${API_BASE_URL}/api/auth/register`, {   
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(credentials)
             });
            const respRegister = await resp.json();
            if (!resp.ok) {
                return rejectWithValue(respRegister.message || 'registration unsuccessful!');
            }
            localStorage.setItem('token', respRegister.data.token);
            return respRegister;
        } catch (e) {
            return rejectWithValue(e.message || 'Internal error!');
        }
});

export const loginUser = createAsyncThunk('auth/loginUser',
    async (credentials , { rejectWithValue }) => {
        try {
            const resp = await fetch(`${API_BASE_URL}/api/auth/login`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(credentials)
            });
            const respLogin = await resp.json();

            if (!resp.ok) {
                return rejectWithValue(respLogin.message || 'Login unsuccessful!');
            }

            localStorage.setItem('token', respLogin.data.token);
            return respLogin;
        } catch (e) {
            return rejectWithValue(e.message || 'Internal error!');
    }
});


export const checkAuth = createAsyncThunk('auth/checkAuth', 
    async ( _, { rejectWithValue } ) => {
        try {
            const token = localStorage.getItem('token');
            const resp = await fetch(`${API_BASE_URL}/api/auth/checkAuth`, {
                method: 'GET',
                headers: token ? {Authorization: `Bearer ${token}`} : {},
            });
            const data = await resp.json();

            if (!data.data?.isLogged) {
                localStorage.removeItem('token');
            }
            return data;
        } catch (e) {
            return rejectWithValue(e.message || 'Check auth failed!');
        }
});


export const logoutUser = createAsyncThunk('auth/logout', 
    async ( _ , { rejectWithValue }) => {
        try {
            //placeholder backend call
            const token = localStorage.getItem('token');
            const resp = await fetch(`${API_BASE_URL}/api/auth/logout`, {
                method: 'POST',
                headers: token ? {Authorization: `Bearer ${token}`} : {}
            });
            const data = await resp.json()
            if (!resp.ok) {
                return rejectWithValue(data.message || 'Logout failed!');
            }
            localStorage.removeItem('token');
            return data;
        }
        catch (e) {
            return rejectWithValue(e.message || 'Logout failed!');
        }
});