import { useState } from 'react';

// redux
import { useDispatch } from 'react-redux'
import { addReview } from '../redux/slices/reviewsSlice';
import { setError, setErrorName, setSuccess, setSuccessName } from '../redux/slices/notificationsSlice';

const REVIEWS_API_URL = '/api/reviews/'

const useReview = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user.id;
    const token = user.token;
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const createReview = async (id, name, title, rating, comment) => {
        setLoading(true);
        try {
            const response = await fetch(REVIEWS_API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json',
                            'Authorization': token},
                body: JSON.stringify({id: id, user: userId, name: name, title: title, rating: rating, comment: comment})
            });
            
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText);
            }

            const json = await response.json();
            dispatch(addReview(json));
            dispatch(setSuccess(true));
            dispatch(setSuccessName('Review successfully created!'));
            setTimeout(() => {
                dispatch(setSuccess(false));
              }, 100);
            setLoading(false);
            return true;
        } catch (err) {
            const parsedError = JSON.parse(err.message);
            dispatch(setError(true));
            dispatch(setErrorName(parsedError.message));
            setTimeout(() => {
                dispatch(setError(false));
              }, 100);
            setLoading(false);
            return false;
        }
    
    }

    return { loading, createReview };
}

export default useReview;