import { useState } from 'react';

const CUSTOMERS_API_URL = '/api/user'

const useResetPassword = () => {
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [isLoading, setIsLoading] = useState(null)

    const resetPassword = async (token, newPassword, confirmNewPassword) => {
        setIsLoading(true);
        setError(null);
        setSuccess(null)
        const response = await fetch(`${CUSTOMERS_API_URL}/reset-password/${token}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({newPassword: newPassword, confirmNewPassword: confirmNewPassword})
        });
        const json = await response.json();
        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
            return json.error;
        };
        if (response.ok) {
            setError(null)
            setSuccess(json.message)
            return "Password changed successfully";
        };
    }

    return { resetPassword, isLoading, error, success }
};

export default useResetPassword;