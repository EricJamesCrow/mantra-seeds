import { useDispatch } from "react-redux"

import { logoutAuth } from "../redux/slices/authSlice"
import { clearCart } from "../redux/slices/cartSlice"
import { clearOrders } from "../redux/slices/ordersSlice"

export const useLogout = () => {
    const dispatch = useDispatch()

    const logout = () => {
        // remove user from storage
        localStorage.removeItem('user')

        // dispatch logout action
        dispatch(logoutAuth())
        dispatch(clearCart())
        dispatch(clearOrders())
    }

    return { logout }
}