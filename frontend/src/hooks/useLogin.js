import { useState } from 'react'

import { useDispatch } from 'react-redux'

import { loginAuth } from '../redux/slices/authSlice'

import { useCart } from './useCart'
import { useFetchAdmin } from './useFetchAdmin'

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const dispatch = useDispatch()
    const { fetchUserCart } = useCart()
    const { fetchOrders, fetchCustomers } = useFetchAdmin()

    const login = async (email, password) => {
        setIsLoading(true)
        setError(null)

        // Get the cart ID from localStorage
        const localStorageCartId = localStorage.getItem('cart');

        const response = await fetch('/api/user/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password, localStorageCartId})
        })
        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }
        if (response.ok) {
            // save the user to local store
            localStorage.setItem('user', JSON.stringify(json))

            // update the auth context
            dispatch(loginAuth(json));
            const user = json;
            fetchUserCart(user);
            localStorage.removeItem('cart');
            if(user.role === 1) {
                fetchOrders(user);
                fetchCustomers(user);
            }
            setIsLoading(false);
            return "success";
        }
    }

    return { login, isLoading, error }
}
