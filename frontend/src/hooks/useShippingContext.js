import { ShippingContext } from '../context/ShippingContext'
import { useContext } from 'react'

export const useShippingContext = () => {
    const context = useContext(ShippingContext)

    if (!context) {
        throw Error('useShippingContext must be used inside an ShippingContextProvider')
    }

    return context
}
