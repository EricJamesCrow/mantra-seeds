import { createSlice } from '@reduxjs/toolkit';

const notificationsSlice = createSlice({
    name: 'notifications',
    initialState: {
        addToCartTriggered: false,
        removedItemTriggered: false,
        removedItem: null
    },
    reducers: {
        setAddToCart: (state, action) => {
            state.addToCartTriggered = action.payload;
        },
        setRemovedItem: (state, action) => {
            state.removedItemTriggered = action.payload;
        },
        setRemovedItemName: (state, action) => {
            state.removedItem = action.payload;
        },
    }
});

export const { setAddToCart, setRemovedItem, setRemovedItemName } = notificationsSlice.actions;

export default notificationsSlice.reducer;