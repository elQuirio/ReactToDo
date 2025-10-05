import { createAsyncThunk } from "@reduxjs/toolkit";
import { resetPreferences } from '../slices/preferencesSlicer';

export const getUserPreferences = createAsyncThunk(
    'preferences/getUserPreferences', 
    async ( _ , { dispatch } ) => {
        const resp = await fetch('http://localhost:3000/api/preferences', {
            method: "GET",
            credentials: "include"
        });
        const pref = await resp.json();
        dispatch(resetPreferences(pref));
    });