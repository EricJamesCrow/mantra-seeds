import React, { createContext, useReducer } from 'react'

export const ShippingContext = createContext()

export const shippingReducer = (state, action) => {
    switch (action.type) {
        case 'SET_SHIPPING':
            return {
                shipping: action.payload
            }
        default:
            return state
    }
}

export const ShippingContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(shippingReducer, {
        shipping: null
    })

    return (
        <ShippingContext.Provider value={{...state, dispatch}}>
            { children }
        </ShippingContext.Provider>
    )
}
