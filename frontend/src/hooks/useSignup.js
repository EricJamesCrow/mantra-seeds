import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { loginAuth } from '../redux/slices/authSlice'

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const dispatch = useDispatch()

    const signup = async (email, password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('/api/user/signup', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        })
        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
            console.log(json.error)
        }
        if (response.ok) {
            // save the user to local store
            localStorage.setItem('user', JSON.stringify(json))

            // update the auth context
            dispatch(loginAuth(json))

            setIsLoading(false)
            return "success";
        }
    }

    return { signup, isLoading, error }
}
