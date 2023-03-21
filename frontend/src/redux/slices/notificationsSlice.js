import { createSlice } from '@reduxjs/toolkit';

const notificationsSlice = createSlice({
    name: 'notifications',
    initialState: {
        addToCartTriggered: false,
        removedItemTriggered: false,
    },
    reducers: {
        setAddToCart: (state, action) => {
            state.addToCartTriggered = action.payload;
        },
        setRemovedItem: (state, action) => {
            state.removedItemTriggered = action.payload;
        }
    }
});

export const { setAddToCart, setRemovedItem } = notificationsSlice.actions;

export default notificationsSlice.reducer;