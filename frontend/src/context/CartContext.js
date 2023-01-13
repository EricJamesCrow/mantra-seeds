import React, { createContext, useReducer } from 'react';

export const CartContext = createContext();

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'SET_CART':
            return {
                cartItems: action.payload
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
