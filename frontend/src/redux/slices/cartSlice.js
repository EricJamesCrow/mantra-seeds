import { createSlice } from '@reduxjs/toolkit';

const setCartLocalStorage = (id) => {
  const user = localStorage.getItem('user');

  if (!user) {
    let cart = localStorage.getItem('cart');

    if (!cart) {
      localStorage.setItem('cart', id);
    }
  }
};

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
      _id: null,
      cartItems: null,
      subtotal: 0
    },
    reducers: {
      setCart: (state, action) => {
        state._id = action.payload._id;
        state.cartItems = action.payload.cartItems;
        state.subtotal = action.payload.subtotal;
      },
      updateCart: (state, action) => {
        state._id = action.payload._id;
        state.cartItems = action.payload.cartItems;
        state.subtotal = action.payload.subtotal;
        setCartLocalStorage(action.payload._id);
      },
      deleteItem: (state, action) => {
        const deletedItem = state.cartItems.find(item => item._id === action.payload._id);
        const newSubtotal = state.subtotal - deletedItem.price * deletedItem.quantity;
  
        state.cartItems = state.cartItems.filter(item => item._id !== action.payload._id);
        state.subtotal = newSubtotal;
      },
      clearCart: (state) => {
        state._id = null;
        state.cartItems = null;
        state.subtotal = 0;
        let user = localStorage.getItem('user');
        if(user) {
          user = JSON.parse(user);
          delete user.cart;
          localStorage.setItem('user', JSON.stringify(user));
        } else {
          localStorage.removeItem('cart');
        }
      }
    }
  });
  
  export const { setCart, updateCart, deleteItem, clearCart } = cartSlice.actions;

  export default cartSlice.reducer;