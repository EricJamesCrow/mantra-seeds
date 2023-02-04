import { useState } from 'react';

// redux
import { useDispatch } from 'react-redux'
import { updateCart } from '../redux/slices/cartSlice';

const useAddToCart = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();

    const addToCart = async (id, product, quantity, price) => {
        setLoading(true);
        try {
            // Make a post request to the addItemToCart endpoint on the backend
            const response = await fetch('/api/carts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user:  id,
                    cartItems: [{ product, quantity, price }]
                })
            });
            const json = await response.json();
            dispatch(updateCart(json.cart))
            setLoading(false);
        } catch (err) {
            setError(err);
            setLoading(false);
        }
    };

    return { loading, error, addToCart };
};

export default useAddToCart;
