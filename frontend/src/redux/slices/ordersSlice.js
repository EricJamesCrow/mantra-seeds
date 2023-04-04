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
      state.orders = { ...state.orders, ...action.payload };
    }
  },
});

export const { setOrders, updateOrders } = ordersSlice.actions;

export default ordersSlice.reducer;
