import React, { createContext, useReducer, useEffect } from 'react';

// hooks
import { useAuthContext } from '../hooks/useAuthContext';

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
    const { user } = useAuthContext()

    const [state, dispatchCart] = useReducer(cartReducer, {
        cartItems: null,
        subtotal: 0
    });

    useEffect(() => {
      const fetchCart = async () => {
        const response = await fetch('/api/carts/'+user.cart)
        const json = await response.json()

        if (response.ok) {
          dispatchCart({type: 'SET_CART', payload: json})
        }
      }
      if(user) {
        fetchCart()
      }
    }, [user])
    
    return (
        <CartContext.Provider value={{ ...state, dispatchCart }}>
            {children}
        </CartContext.Provider>
    );
};
