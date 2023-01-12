import { useState } from 'react';

const useAddToCart = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const addToCart = async (user, product, quantity) => {
        setLoading(true);
        try {
            // Make a post request to the addItemToCart endpoint on the backend
            const response = await fetch('/api/cart', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user: { user },
                    cartItems: [{ product, quantity }]
                })
            });
            const json = await response.json();
            // Update the cart state
            // ...
            setLoading(false);
        } catch (err) {
            setError(err);
            setLoading(false);
        }
    };

    return { loading, error, addToCart };
};

export default useAddToCart;
