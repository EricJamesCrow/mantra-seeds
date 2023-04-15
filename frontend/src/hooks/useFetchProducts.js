import { useDispatch } from 'react-redux'
import { setProducts } from '../redux/slices/productSlice'
import { setReviews } from '../redux/slices/reviewsSlice'

const PRODUCTS_API_URL = '/api/products/'
const REVIEWS_API_URL = '/api/reviews/'

export const useFetchProducts = () => {
    const dispatch = useDispatch()

    const fetchProducts = async () => {
        const response = await fetch(PRODUCTS_API_URL)
        const json = await response.json()
    
        if (response.ok) {
          dispatch(setProducts(json))
        }
        if (!response.ok) {
          dispatch(setProducts(null))
        }
      }

    const fetchReviews = async () => {
        const response = await fetch(REVIEWS_API_URL)
        const json = await response.json()

        if (response.ok) {
            dispatch(setReviews(json))
        }
        if (!response.ok) {
            dispatch(setReviews(null))
        }
    }

    return { fetchProducts, fetchReviews }
}
