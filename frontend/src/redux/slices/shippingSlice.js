import { createSlice } from '@reduxjs/toolkit';

const shippingSlice = createSlice({
  name: 'shipping',
  initialState: {
    shipping: null
  },
  reducers: {
    setShipping: (state, action) => {
      state.shipping = action.payload;
    },
    updateShipping: (state, action) => {
      state.shipping = { ...state.shipping, ...action.payload };
    }
  }
});

export const { setShipping, updateShipping } = shippingSlice.actions;

export default shippingSlice.reducer;
