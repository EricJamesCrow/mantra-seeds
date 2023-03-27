import { useState } from 'react';

const CUSTOMERS_API_URL = '/api/user'

const useRequestResetPassword = () => {
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [isLoading, setIsLoading] = useState(null)

    const requestResetPassword = async (email) => {
        setIsLoading(true);
        setError(null);
        setSuccess(null)
        const response = await fetch(CUSTOMERS_API_URL+'/request-reset-password', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email: email})
        });
        const json = await response.json();
        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
            return json.error;
        };
        if (response.ok) {
            setIsLoading(false)
            setError(null)
            setSuccess(json.message)
            return json.message;
        };
    }

    return { requestResetPassword, isLoading, error, success }
};

export default useRequestResetPassword;