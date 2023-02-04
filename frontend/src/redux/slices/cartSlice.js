import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
      cartItems: null,
      subtotal: 0
    },
    reducers: {
      setCart: (state, action) => {
        state.cartItems = action.payload.cartItems;
        state.subtotal = action.payload.subtotal;
      },
      updateCart: (state, action) => {
        state.cartItems = action.payload.cartItems;
        state.subtotal = action.payload.subtotal;
      },
      deleteItem: (state, action) => {
        const deletedItem = state.cartItems.find(item => item._id === action.payload._id);
        const newSubtotal = state.subtotal - deletedItem.price * deletedItem.quantity;
  
        state.cartItems = state.cartItems.filter(item => item._id !== action.payload._id);
        state.subtotal = newSubtotal;
      },
      clearCart: (state) => {
        state.cartItems = null;
        state.subtotal = 0;
      }
    }
  });
  
  export const { setCart, updateCart, deleteItem, clearCart } = cartSlice.actions;

  export default cartSlice.reducer;