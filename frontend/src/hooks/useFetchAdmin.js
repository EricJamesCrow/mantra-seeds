import { useDispatch } from 'react-redux'

import { setOrders } from '../redux/slices/ordersSlice'
import { setCustomers } from '../redux/slices/customersSlice'

const ORDERS_API_URL = '/api/orders'
const CUSTOMERS_API_URL = '/api/user'

export const useFetchAdmin = () => {
    const dispatch = useDispatch()

    const fetchOrders = async (user) => {
        const token = user.token
        const headers = {
            'Authorization': token
        }
        const response = await fetch(ORDERS_API_URL, { headers });
        const json = await response.json();
        if(response.ok) {
          dispatch(setOrders(json))
        }
    }

    const fetchCustomers = async (user) => {
      const token = user.token
      const headers = {
          'Authorization': token
      }
      const response = await fetch(CUSTOMERS_API_URL, { headers });
      const json = await response.json();
      if(response.ok) {
        dispatch(setCustomers(json))
      }
    }
  
  return { fetchOrders, fetchCustomers }
}
