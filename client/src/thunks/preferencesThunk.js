import { createAsyncThunk } from "@reduxjs/toolkit";
import { resetPreferences } from '../slices/preferencesSlicer';
import { resetTodos } from '../slices/todoSlicer';
import { headerGenerator } from '../utils/helpers';
import { API_BASE_URL } from "../config/api";

export const fetchPreferences = createAsyncThunk(
    'preferences/getUserPreferences', 
    async ( _ , { dispatch, rejectWithValue } ) => {
        try{
            const header = headerGenerator(false);
            const resp = await fetch(`${API_BASE_URL}/api/preferences`, {
                method: "GET",
                headers: header
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
            const header = headerGenerator(true);
            const resp = await fetch(`${API_BASE_URL}/api/preferences`, {
                method: "PATCH",
                headers: header,
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