import { configureStore } from '@reduxjs/toolkit';

import shippingReducer from './slices/shippingSlice';
import cartReducer from './slices/cartSlice';

export default configureStore({
    reducer: {
        shipping: shippingReducer,
        cart: cartReducer
    }
})