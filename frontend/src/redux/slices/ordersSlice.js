import { createSlice } from '@reduxjs/toolkit';

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],
    order: null,
  },
  reducers: {
    setOrder: (state, action) => {
      state.order = action.payload;
      state.orders.unshift(action.payload);
    },
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

export const { setOrder, setOrders, updateOrders } = ordersSlice.actions;

export default ordersSlice.reducer;
