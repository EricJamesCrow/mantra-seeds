import { configureStore } from '@reduxjs/toolkit';

import shippingReducer from './slices/shippingSlice';
import cartReducer from './slices/cartSlice';
import productReducer from './slices/productSlice';

export default configureStore({
    reducer: {
        shipping: shippingReducer,
        cart: cartReducer,
        products: productReducer
    }
})