import { createAsyncThunk } from "@reduxjs/toolkit";
import { resetPreferences } from '../slices/preferencesSlicer';

export const fetchPreferences = createAsyncThunk(
    'preferences/getUserPreferences', 
    async ( _ , { dispatch, rejectWithValue } ) => {
        try{
            const resp = await fetch('http://localhost:3000/api/preferences', {
                method: "GET",
                credentials: "include"
            });
            const data = await resp.json();
            if (!resp.ok) {
                return rejectWithValue(data.message || "Server error fetching user parameters!");
            }
            dispatch(resetPreferences(data.data));
        } 
        catch (e) {
            return rejectWithValue(e.message || "Error fetching user preferences!");
        }
    });

export const updatePreferences = createAsyncThunk(
    'preferences/updatePreferences', 
    async ( pref, { dispatch, rejectWithValue }) => {
        try {
            const resp = await fetch('http://localhost:3000/api/preferences', {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(pref)
            });

            const data = await resp.json();

            if (!resp.ok) {
                return rejectWithValue(data.message || "Server error saving preferences!")
            }
            dispatch(resetPreferences(data.data));
        } catch (e) {
            return rejectWithValue(e.message || "Error updating preferences!");
        }
    });