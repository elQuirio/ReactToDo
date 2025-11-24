import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";

export const registerUser = createAsyncThunk('auth/registerUser', 
    async ( credentials, {dispatch, rejectWithValue}) => {
        try {
            const resp = await fetch('http://localhost:3000/api/auth/register', 
            {   method:"POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(credentials)
             });
            const respRegister = await resp.json();
            console.log(resp);
            if (!resp.ok) {
                console.log('RESP not ok');
                return rejectWithValue(respRegister.error);
            }
            console.log(respRegister);
            return respRegister; // aggiungere dispatch allo store
        }
        catch (e) {
            return rejectWithValue(e);
        }
});

export const loginUser = createAsyncThunk('auth/loginUser',
    async (credentials , {dispatch, rejectWithValue}) => {
        try {
            const resp = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(credentials)
            });
            const respLogin = await resp.json();
            if (!resp.ok) {
                console.log('RESP not ok');
                return rejectWithValue(respLogin.error);
            }
            console.log(respLogin);
            return respLogin; // aggiungere dispatch allo store
        } catch (e) {
            return rejectWithValue(e);
    }
});