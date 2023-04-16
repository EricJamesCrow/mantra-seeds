import { createSlice } from '@reduxjs/toolkit';

const reviewsSlice = createSlice({
    name: 'reviews',
    initialState: {
        reviews: null
    },
    reducers: {
        setReviews: (state, action) => {
            state.reviews = action.payload;
        },
        addReview: (state, action) => {
            state.reviews = [action.payload, ...state.reviews];
        },
        deleteReview: (state, action) => {
            state.reviews = state.reviews.filter(r => r._id !== action.payload._id);
        },
        updateReview: (state, action) => {
            state.reviews = state.reviews.map(review =>
                review._id === action.payload._id ? action.payload : review
            );
        },
    },
});

export const { setReviews, addReview, deleteReview, updateReview } = reviewsSlice.actions;

export default reviewsSlice.reducer;