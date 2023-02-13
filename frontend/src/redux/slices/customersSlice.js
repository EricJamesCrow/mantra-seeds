import { createSlice } from '@reduxjs/toolkit';

const customersSlice = createSlice({
  name: 'customers',
  initialState: {
    customers: null
  },
  reducers: {
    setCustomers: (state, action) => {
      state.customers = action.payload;
    }
  },
});

export const { setCustomers } = customersSlice.actions;

export default customersSlice.reducer;
