import { useDispatch } from 'react-redux'
import { deleteItem, setCart } from '../redux/slices/cartSlice'
import { setRemovedItem, setRemovedItemName } from '../redux/slices/notificationsSlice'

const CARTS_API_URL = '/api/carts/'

export const useCart = () => {
    const dispatch = useDispatch()

    const fetchCart = async () => {
        let id = localStorage.getItem('cart');
        if (!id) { 
          dispatch(setCart({_id: null, cartItems: null, subtotal: 0}));
        } else {
            const response = await fetch(CARTS_API_URL+id);
            const json = await response.json();
            if (response.ok) {
              dispatch(setCart(json));
            }
            if (!response.ok) {
              dispatch(setCart({_id: null, cartItems: null, subtotal: 0}));
              localStorage.removeItem('cart');
            }
        }
      }

      const fetchUserCart = async (user) => {
        if (!user || !user.cart) {
          dispatch(setCart({_id: null, cartItems: null, subtotal: 0}));
          return;
        }
      
        try {
          const response = await fetch(CARTS_API_URL+user.cart);
          if (!response.ok) {
            throw new Error('Cart not found');
          }
          const json = await response.json();
          dispatch(setCart(json));
        } catch (error) {
          dispatch(setCart({_id: null, cartItems: null, subtotal: 0}));
        }
      }      

    const handleDelete = async (id, product) => { 
        const response = await fetch(CARTS_API_URL+id, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
              product: product._id
          })
      });
        const json = await response.json();
        if(response.ok) {
          dispatch(deleteItem(json));
          dispatch(setRemovedItem(true));
          dispatch(setRemovedItemName(product.name))
          setTimeout(() => {
              dispatch(setRemovedItem(false));
            }, 0);
        }
      };

    return { fetchCart, fetchUserCart, handleDelete }
}
