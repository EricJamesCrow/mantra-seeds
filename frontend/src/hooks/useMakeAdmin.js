import { useState } from 'react';

// redux
import { useDispatch } from 'react-redux'
import { setSuccess, setSuccessName, setError, setErrorName } from '../redux/slices/notificationsSlice';

const CUSTOMERS_API_URL = '/api/user/'

const useMakeAdmin = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user.token;
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const makeAdmin = async (id) => {
        setLoading(true);
        try {
            // Makes a post request to the addItemToCart endpoint on the backend
            const response = await fetch(CUSTOMERS_API_URL+'promote/'+id, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json',
                            'Authorization': token}
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText);
            }

            const json = await response.json();
            dispatch(setSuccess(true));
            dispatch(setSuccessName(json.message));
            setTimeout(() => {
                dispatch(setSuccess(false));
              }, 100);
            setLoading(false);
        } catch (err) {
            const parsedError = JSON.parse(err.message);
            console.log(parsedError.error)
            dispatch(setError(true));
            dispatch(setErrorName(parsedError.error));
            setTimeout(() => {
                dispatch(setError(false));
              }, 100);
            setLoading(false);
        }
    };

    return { loading, makeAdmin };
};

export default useMakeAdmin;
