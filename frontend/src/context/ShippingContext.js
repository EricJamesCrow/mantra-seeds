import React, { createContext, useReducer } from 'react'

export const ShippingContext = createContext()

export const shippingReducer = (state, action) => {
    switch (action.type) {
        case 'SET_SHIPPING':
            return {
                shipping: action.payload
            }
        case 'UPDATE_SHIPPING':
            return {
                ...state,
                shipping: {
                    ...state.shipping,
                    ...action.payload
                }
            }    
        default:
            return state
    }
}

export const ShippingContextProvider = ({ children }) => {
    const [state, dispatchShipping] = useReducer(shippingReducer, {
        shipping: null
    })

    console.log('ShippingContext state: ', state)

    return (
        <ShippingContext.Provider value={{...state, dispatchShipping}}>
            { children }
        </ShippingContext.Provider>
    )
}
