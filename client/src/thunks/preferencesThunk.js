import { createAsyncThunk } from "@reduxjs/toolkit";
import { resetPreferences } from '../slices/preferencesSlicer';
import { resetTodos } from '../slices/todoSlicer';
import { API_BASE_URL } from "../config/api";

export const fetchPreferences = createAsyncThunk(
    'preferences/getUserPreferences', 
    async ( _ , { dispatch, rejectWithValue } ) => {
        try{
            const token = localStorage.getItem('token');
            const resp = await fetch(`${API_BASE_URL}/api/preferences`, {
                method: "GET",
                headers: token ? {Authorization: `Bearer ${token}`} : {},
            });
            const data = await resp.json();

            if (resp.status === 401) {
                localStorage.removeItem('token');
                return rejectWithValue(data.message || "Error fetching user preferences!");
            }

            if (!resp.ok) {
                return rejectWithValue(data.message || "Error fetching user preferences!");
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
            const token = localStorage.getItem('token');
            const resp = await fetch(`${API_BASE_URL}/api/preferences`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                     ... (token && { Authorization: `Bearer ${token}` })
                 },
                body: JSON.stringify(pref)
            });

            const data = await resp.json();

            if (resp.status === 401) {
                localStorage.removeItem('token');
                return rejectWithValue(data.message || "Error updating preferences!");
            }

            if (!resp.ok) {
                return rejectWithValue(data.message || "Error updating preferences!")
            }
            dispatch(resetPreferences(data.data.preferences));
            dispatch(resetTodos(data.data.todos));

        } catch (e) {
            return rejectWithValue(e.message || "Error updating preferences!");
        }
    });