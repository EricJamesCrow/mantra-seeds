import React, { createContext, useReducer } from 'react';

export const CartContext = createContext();

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'SET_CART':
            return {
                cartItems: action.payload,
                subtotal: action.payload.subtotal
            };
        case 'UPDATE_CART':
            return {
                cartItems: action.payload,
                subtotal: action.payload.subtotal
            };
        case 'DELETE_ITEM':
            const deletedItem = state.cartItems.cartItems.find(item => item._id === action.payload._id);
            const newSubtotal = state.cartItems.subtotal - deletedItem.price * deletedItem.quantity;

            return {
                ...state,
                cartItems: {
                ...state.cartItems,
                cartItems: state.cartItems.cartItems.filter((item) => item._id !== action.payload._id),
                subtotal: newSubtotal
                }
            };                      
        default:
            return state;
    }
};

export const CartContextProvider = ({ children }) => {
    const [state, dispatchCart] = useReducer(cartReducer, {
        cartItems: null,
        subtotal: 0
    });
    
    return (
        <CartContext.Provider value={{ ...state, dispatchCart }}>
            {children}
        </CartContext.Provider>
    );
};
