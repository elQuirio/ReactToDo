import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_BASE_URL } from '../config/api';
import { headerGenerator } from '../utils/helpers';
import { addMessage, resetMessages } from '../slices/messageSlice';

export const askChat = createAsyncThunk(
    "chat/askChat", 
    async ( message , { dispatch, rejectWithValue }) => {
        try {
            const header = headerGenerator(true);
            const res = await fetch(`${API_BASE_URL}/api/chat/messages`, {
                method: 'POST',
                headers: header,
                body: JSON.stringify({ message: message })
            });
            
            const data = await res.json();
            if (res.status === 401) {
                localStorage.removeItem('token');
                return rejectWithValue(data.message || "Error asking chat!");
            }

            if (!res.ok) {
                return rejectWithValue(data.message || "Error asking chat!");
            }
            //dispatch(resetMessages(data.data));
            const [ userMessage, assistantMessage ] = data.data.messages;

            //dispatch(addMessage(userMessage));
            //dispatch(addMessage(assistantMessage));

            return {}


        } catch (e) {
            return rejectWithValue(e.message || "Error asking chat!");
        }
    }
);



export const fetchMessages = createAsyncThunk(
    'chat/messages', 
    async ( _ , { dispatch, rejectWithValue }) => {
        try {
            const header = headerGenerator(false);
            const res = await fetch(`${API_BASE_URL}/api/chat/messages`, {
                method: 'GET',
                headers: header,
            });
            const data = await res.json();
            if (res.status === 401) {
                localStorage.removeItem('token');
                return rejectWithValue(data.message || "Error fetching messages!");
            }

            if (!res.ok) {
                return rejectWithValue(data.message || "Error fetching messages!");
            }
            dispatch(resetMessages(data.data));

        } catch (err) {

        }
});