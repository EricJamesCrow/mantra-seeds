import { createSlice } from '@reduxjs/toolkit';

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: null
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    createProduct: (state, action) => {
      state.products = [action.payload, ...state.products];
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter(p => p._id !== action.payload._id);
    },
    updateProduct: (state, action) => {
      state.products = state.products.map(product =>
        product._id === action.payload._id ? action.payload : product
      );
    },
  },
});

export const { setProducts, createProduct, deleteProduct, updateProduct } = productsSlice.actions;

export default productsSlice.reducer;
