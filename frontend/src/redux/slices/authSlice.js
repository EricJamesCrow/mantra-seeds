import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null
    },
    reducers: {
        loginAuth: (state, action) => {
            state.user = action.payload;
        },
        logoutAuth: (state, action) => {
            state.user = null;
        },
    }
});

export const { loginAuth, logoutAuth } = authSlice.actions;

export default authSlice.reducer;