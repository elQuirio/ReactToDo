import { createAsyncThunk } from "@reduxjs/toolkit";

export const registerUser = createAsyncThunk('auth/registerUser', 
    async ( credentials, {dispatch}) => {
        const resp = await fetch('http://localhost:3000/api/auth/register', 
            {   method:"POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(credentials)
             });
        const respRegister = await resp.json();
        return respRegister;
    }
);