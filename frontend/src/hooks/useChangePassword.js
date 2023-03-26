import { useState } from 'react';

const CUSTOMERS_API_URL = '/api/user'

const useChangePassword = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user.token;
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [isLoading, setIsLoading] = useState(null)

    const changePassword = async (oldPassword, newPassword, confirmNewPassword) => {
        setIsLoading(true);
        setError(null);
        setSuccess(null)
        const response = await fetch(CUSTOMERS_API_URL+'/change-password', {
            method: 'POST',
            headers: {'Content-Type': 'application/json',
                    'Authorization': token},
            body: JSON.stringify({oldPassword: oldPassword, newPassword: newPassword, confirmNewPassword: confirmNewPassword})
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
            localStorage.setItem('user', JSON.stringify(json.user))
            return json.message;
        };
    };

    return { changePassword, isLoading, error, success }

};

export default useChangePassword;