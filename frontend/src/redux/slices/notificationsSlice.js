import { createSlice } from '@reduxjs/toolkit';

const notificationsSlice = createSlice({
    name: 'notifications',
    initialState: {
        addToCartTriggered: false,
        removedItemTriggered: false,
        removedItem: null,
        bannedCustomerTriggered: false,
        bannedCustomer: null,
        errorTriggered: false,
        errorName: null,
        successTriggered: false,
        successName: null
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
        setBannedCustomer: (state, action) => {
            state.bannedCustomerTriggered = action.payload;
        },
        setBannedCustomerName: (state, action) => {
            state.bannedCustomer = action.payload;
        },
        setError: (state, action) => {
            state.errorTriggered = action.payload;
        },
        setErrorName: (state, action) => {
            state.errorName = action.payload;
        },
        setSuccess: (state, action) => {
            state.successTriggered = action.payload;
        },
        setSuccessName: (state, action) => {
            state.successName = action.payload;
        }
    }
});

export const { setAddToCart, 
    setRemovedItem, 
    setRemovedItemName, 
    setBannedCustomer, 
    setBannedCustomerName, 
    setError,  
    setErrorName,
    setSuccess,
    setSuccessName} = notificationsSlice.actions;

export default notificationsSlice.reducer;