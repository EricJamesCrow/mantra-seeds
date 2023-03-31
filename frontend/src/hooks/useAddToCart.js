import { useState } from 'react';

// redux
import { useDispatch, useSelector } from 'react-redux'
import { updateCart } from '../redux/slices/cartSlice';
import { setAddToCart } from '../redux/slices/notificationsSlice';

const useAddToCart = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const id = useSelector(state => state.cart._id);
    const dispatch = useDispatch();

    const addToCart = async (product, quantity, price) => {
        setLoading(true);
        setError(null);
        try {
            // Makes a post request to the addItemToCart endpoint on the backend
            const response = await fetch('/api/carts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id:  id,
                    cartItems: [{ product, quantity, price }]
                })
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText);
            }

            const json = await response.json();
            dispatch(updateCart(json.cart))
            dispatch(setAddToCart(true))
            setTimeout(() => {
                dispatch(setAddToCart(false));
              }, 100);
            setLoading(false);
        } catch (err) {
            const errorMessage = JSON.parse(err.message);
            setError(errorMessage.error);
            setLoading(false);
        }
    };

    return { loading, error, addToCart };
};

export default useAddToCart;
