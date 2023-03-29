import { useDispatch } from 'react-redux'
import { setProducts } from '../redux/slices/productSlice';

const PRODUCTS_API_URL = '/api/products/'

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

    return { fetchProducts }
}
