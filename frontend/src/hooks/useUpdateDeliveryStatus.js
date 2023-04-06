import { useState } from 'react';

// redux
import { useDispatch } from 'react-redux'
import { updateOrders } from '../redux/slices/ordersSlice';
import { setSuccess, setSuccessName, setError, setErrorName } from '../redux/slices/notificationsSlice';

const ORDERS_API_URL = '/api/orders/'

const useUpdateDeliveryStatus = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user.token;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();

    const updateDeliveryStatus = async (id, deliveryStatus) => {
        setLoading(true);
        setError(null);
        try {
            // Makes a post request to the addItemToCart endpoint on the backend
            const response = await fetch(ORDERS_API_URL+id, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json',
                            'Authorization': token},
                body: JSON.stringify({
                    status:  deliveryStatus,
                })
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText);
            }

            const json = await response.json();
            dispatch(updateOrders(json.order))
            dispatch(setSuccess(true));
            dispatch(setSuccessName(json.message));
            setTimeout(() => {
                dispatch(setSuccess(false));
              }, 100);
            setLoading(false);
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

    return { loading, error, updateDeliveryStatus };
};

export default useUpdateDeliveryStatus;
