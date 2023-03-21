import { createSlice } from '@reduxjs/toolkit';

const notificationsSlice = createSlice({
    name: 'notifications',
    initialState: {
        addToCart: false,
    },
    reducers: {
        setAddToCart: (state, action) => {
            state.addToCart = action.payload;
        },
    }
});

export const { setAddToCart } = notificationsSlice.actions;

export default notificationsSlice.reducer;