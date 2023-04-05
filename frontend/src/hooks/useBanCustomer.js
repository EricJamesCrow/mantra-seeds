import { useState } from 'react';

// redux
import { useDispatch } from 'react-redux'
import { updateOrders } from '../redux/slices/ordersSlice';

const CUSTOMERS_API_URL = '/api/user/'

const useBanCustomer = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user.token;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();

    const banCustomer = async (id) => {
        setLoading(true);
        setError(null);
        try {
            // Makes a post request to the addItemToCart endpoint on the backend
            const response = await fetch(CUSTOMERS_API_URL+'ban/'+id, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json',
                            'Authorization': token}
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText);
            }

            const json = await response.json();
            console.log(json)
            setLoading(false);
        } catch (err) {
            const errorMessage = JSON.parse(err.message);
            setError(errorMessage.error);
            setLoading(false);
        }
    };

    return { loading, error, banCustomer };
};

export default useBanCustomer;
