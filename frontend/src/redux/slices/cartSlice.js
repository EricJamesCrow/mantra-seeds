import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCart = createAsyncThunk('cart/fetchCart', async (cartId) => {
    const response = await fetch(`/api/carts/${cartId}`);
    const json = await response.json();
    return json;
  });

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
      }
    },
    extraReducers: {
    [fetchCart.pending]: (state, action) => {
        state.loading = true;
        state.error = null;
        },
        [fetchCart.fulfilled]: (state, action) => {
        state.cartItems = action.payload.cartItems;
        state.subtotal = action.payload.subtotal;
        state.loading = false;
        state.error = null;
        },
        [fetchCart.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.error;
        }
    }
  });
  
  export const { setCart, updateCart, deleteItem } = cartSlice.actions;

  export default cartSlice.reducer;