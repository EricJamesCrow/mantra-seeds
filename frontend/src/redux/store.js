import { configureStore } from '@reduxjs/toolkit';

import shippingReducer from './slices/shippingSlice';

export default configureStore({
    reducer: {
        shipping: shippingReducer
    }
})