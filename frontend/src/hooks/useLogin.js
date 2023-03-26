import { useState } from 'react'

import { useDispatch } from 'react-redux'

import { loginAuth } from '../redux/slices/authSlice'
import { setCart } from '../redux/slices/cartSlice'

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const dispatch = useDispatch()

    const login = async (email, password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('/api/user/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
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
            dispatch(loginAuth(json))
            const user = json
            const fetchCart = async () => {
                const response = await fetch('/api/carts/'+user.cart)
                const json = await response.json()
          
                if (response.ok) {
                  dispatch(setCart(json))
                }
              }
            fetchCart();

            setIsLoading(false);
            return "success";
        }
    }

    return { login, isLoading, error }
}
