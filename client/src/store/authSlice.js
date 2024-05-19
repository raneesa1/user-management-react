import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

const initialState = {
    user: null,
    status: false,
    error: null,
    message: null,
    token: null,
    role: null,
};

export const signup = createAsyncThunk('auth/signup', async (userData, thunkAPI) => {
    try {
        const response = await axios.post('http://localhost:3000/api/signup', userData);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const login = createAsyncThunk('auth/login', async (userData, thunkAPI) => {
    try {
        const response = await axios.post('http://localhost:3000/api/login', userData);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const updateProfile = createAsyncThunk('auth/updateProfile', async (userData, thunkAPI) => {

    const token = Cookies.get("UserJwtToken"); // Get the token from state
    console.log(token, 'token from update profile')
    console.log(userData.id, 'consoling the id from the auth slice')
    try {
        const response = await axios.patch(`http://localhost:3000/api/user/editProfile/${userData.id}`, { data: userData }, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        UserLogout: (state) => {
            state.user = null;
            state.token = null;
            Cookies.remove('UserJwtToken');
        },
        adminLogout: (state) => {
            Cookies.remove('UserJwtToken');
        },
        clearMessages: (state) => {
            state.error = null;
            state.message = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(signup.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.message = action.payload.message;
                const cookieName = action.payload.role === 'admin' ? 'AdminJwtToken' : 'UserJwtToken';
                Cookies.set(cookieName, action.payload.token, { expires: 15 });
            })
            .addCase(signup.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload.message;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.message = action.payload.message;
                const cookieName = action.payload.role === 'admin' ? 'AdminJwtToken' : 'UserJwtToken';
                Cookies.set(cookieName, action.payload.token, { expires: 15 });
            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload.message;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.message = action.payload.message;
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.error = action.payload.message;
            });
    },
});

export const { UserLogout, clearMessages } = authSlice.actions;

export default authSlice.reducer;
