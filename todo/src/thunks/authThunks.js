import { createAsyncThunk } from "@reduxjs/toolkit";

export const registerUser = createAsyncThunk('auth/registerUser', 
    async ( credentials, {dispatch}) => {
        const resp = await fetch('http://localhost:3000/api/auth/register', 
            {   method:"POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(credentials)
             });
        const respRegister = await resp.json();
        console.log(respRegister);
        return respRegister; // aggiungere dispatch allo store
    }
);

export const loginUser = createAsyncThunk('auth/loginUser',
    async (credentials , {dispatch}) => {
        const res = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials)
        });
        const respLogin = await res.json();
        console.log(respLogin);
        return respLogin; // aggiungere dispatch allo store
    }
);