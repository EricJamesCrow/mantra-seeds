import React, { createContext, useReducer } from 'react';

export const CartContext = createContext();

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'SET_CART':
            return {
                cartItems: action.payload
            };
        case 'DELETE_ITEM':
            return {
            ...state,
            cartItems: state.cartItems.filter((item) => item._id !== action.payload._id),
            };
        default:
            return state;
    }
};

export const CartContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, {
        cartItems: null,
    });

    console.log('CartContext state: ', state)

    return (
        <CartContext.Provider value={{ ...state, dispatch }}>
            {children}
        </CartContext.Provider>
    );
};
