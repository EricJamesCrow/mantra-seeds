import { createSlice } from '@reduxjs/toolkit';

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: null
  },
  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
    updateOrders: (state, action) => {
      state.orders = state.orders.map(order =>
        order._id === action.payload._id ? action.payload : order
      );
    }
  },
});

export const { setOrders, updateOrders } = ordersSlice.actions;

export default ordersSlice.reducer;
