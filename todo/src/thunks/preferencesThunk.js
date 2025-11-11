import { createAsyncThunk } from "@reduxjs/toolkit";
import { resetPreferences } from '../slices/preferencesSlicer';

export const fetchPreferences = createAsyncThunk(
    'preferences/getUserPreferences', 
    async ( _ , { dispatch } ) => {
        const resp = await fetch('http://localhost:3000/api/preferences', {
            method: "GET",
            credentials: "include"
        });
        const pref = await resp.json();
        dispatch(resetPreferences(pref));
    });

export const updatePreferences = createAsyncThunk(
    'preferences/updatePreferences', 
    async ( pref, {dispatch}) => {
        const resp = await fetch('http://localhost:3000/api/preferences', {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(pref)
        });
        const respPref = await resp.json();
        dispatch(resetPreferences(respPref));
    });