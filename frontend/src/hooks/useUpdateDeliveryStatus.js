import { useState } from 'react';

// redux
import { useDispatch } from 'react-redux'
import { updateOrders } from '../redux/slices/ordersSlice';

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
            dispatch(updateOrders(json))
            setLoading(false);
        } catch (err) {
            const errorMessage = JSON.parse(err.message);
            setError(errorMessage.error);
            setLoading(false);
        }
    };

    return { loading, error, updateDeliveryStatus };
};

export default useUpdateDeliveryStatus;
