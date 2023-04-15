import { configureStore } from '@reduxjs/toolkit';

import shippingReducer from './slices/shippingSlice';
import cartReducer from './slices/cartSlice';
import productReducer from './slices/productSlice';
import authReducer from './slices/authSlice';
import ordersReducer from './slices/ordersSlice';
import customersReducer from './slices/customersSlice';
import notificationsReducer from './slices/notificationsSlice';
import reviewsReducer from './slices/reviewsSlice';

export default configureStore({
    reducer: {
        shipping: shippingReducer,
        cart: cartReducer,
        products: productReducer,
        auth: authReducer,
        orders: ordersReducer,
        customers: customersReducer,
        notifications: notificationsReducer,
        reviews: reviewsReducer,
    }
})