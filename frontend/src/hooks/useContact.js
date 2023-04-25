import { useState } from 'react';

// redux
import { useDispatch } from 'react-redux'
import { setSuccess, setSuccessName, setError, setErrorName } from '../redux/slices/notificationsSlice';

const useContact = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const contact = async (name, email, subject, message) => {
        setLoading(true);
        try {
            // Makes a post request to the contact endpoint on the backend
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name,
                    email,
                    subject,
                    message
                })
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText);
            }
            setLoading(false);
            if (response.ok) {
                const json = await response.json();
                dispatch(setSuccess(true));
                dispatch(setSuccessName(json.success));
                setTimeout(() => {
                    dispatch(setSuccess(false));
                  }, 100);
                return true;
            }
        } catch (err) {
            const parsedError = JSON.parse(err.message);
            dispatch(setError(true));
            dispatch(setErrorName(parsedError.error));
            setTimeout(() => {
                dispatch(setError(false));
              }, 100);
            setLoading(false);
        }
    };

    return { loading, contact };
};

export default useContact;