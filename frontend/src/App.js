// react
import { Route, Routes, Navigate, useLocation } from 'react-router-dom'
import React, { useEffect } from 'react';

// redux
import { useDispatch } from 'react-redux';
import { loginAuth } from './redux/slices/authSlice';
import { setOrders } from './redux/slices/ordersSlice';
import { setCustomers } from './redux/slices/customersSlice';

// hooks
import { useCart } from './hooks/useCart';
import { useFetchProducts } from './hooks/useFetchProducts';
import { useFetchAdmin } from './hooks/useFetchAdmin';

// styles
import './App.css';

// components
import Notifications from './components/Notifications';
import Navbar from './components/Navbar';
import SideNav from './components/SideNav';
import AdminNav from './pages/new_admin/components/AdminNav';
import BottomNavBar from './components/BottomNavBar'
import NewProductPage from './components/NewProductPage';
import Reviews from './components/reviews/Reviews'

// pages
import Home from "./pages/new_home/Home"
// import HomeV2 from "./pages/new_home/HomeV2"
import AdminDashboard from "./pages/new_admin/pages/AdminDashboard"
import AdminOrders from "./pages/new_admin/pages/AdminOrders"
import AdminOrdersDetailsPage from './pages/new_admin/pages/AdminOrdersDetailsPage';
import AdminCustomers from './pages/new_admin/pages/AdminCustomers'
import AdminCustomersDetailsPage from './pages/new_admin/pages/AdminCustomerDetailsPage'
import AdminProducts from './pages/new_admin/pages/AdminProducts'
import AdminProductsDetailsPage from './pages/new_admin/pages/AdminProductsDetailsPage'
import Shop from "./pages/new_shop/Shop"
import Cart from "./pages/new_cart/Cart"
import Login from "./pages/login/Login"
import Signup from "./pages/signup/Signup"
import ConfirmAccount from "./pages/confirm-account/ConfirmAccount"
import RequestResetPassword from "./pages/reset-password/RequestResetPassword"
import ResetPasswordLink from "./pages/reset-password/ResetPasswordLink"
import ChangePassword from './pages/new_profile/pages/ChangePassword';
import Checkout from './pages/new_checkout/Checkout';
import OrderSuccess from './pages/new_checkout/OrderSuccess'
import Profile from './pages/new_profile/Profile'
import OrderHistory from './pages/new_profile/pages/OrderHistory'
import OrderPage from './pages/new_profile/pages/OrderPage'
import Search from "./pages/search/Search"
import Contact from "./pages/contact/Contact"

// footer
import Footer from './components/footer/Footer';

// error pages
import NotFound from './pages/errors/NotFound';
import InvalidToken from './pages/errors/InvalidToken';
//

function App() {
  // hooks
  const { fetchCart, fetchUserCart } = useCart();
  const { fetchProducts, fetchReviews } = useFetchProducts();
  const { fetchOrders, fetchCustomers } = useFetchAdmin();
  const location = useLocation()
  const dispatch = useDispatch();

  const fetchUser = async (user) => {
  try {
    const token = user.token;
    const id = user.id;
    const headers = {
        'Authorization': token
    };
    const response = await fetch('/api/user/'+id, { headers });
    const json = await response.json();

    if(response.ok) {
        // merge the json data with the user object
        const updatedUser = {...user, ...json}
        localStorage.setItem('user', JSON.stringify(updatedUser))
        // update the state with the merged data
        dispatch(loginAuth(updatedUser))
    }

    if(!response.ok) {
        // remove the user from local storage
        localStorage.removeItem('user')
        // update the state with the merged data
        dispatch(loginAuth(null))
    }

  } catch (e) {
    // fix this error. user is sometimes undefined
    console.log(e)
  }
    }

  useEffect(() => {
    // TODO: store cart in local storage        
    const user = JSON.parse(localStorage.getItem('user'))
    if (user) {
        try {
        fetchUser(user)
        } catch(err) {
          console.log(err)
        }
    }
    if(user && user.role === 1) {
      fetchOrders(user)
      fetchCustomers(user)
    }
    fetchUser()
    fetchProducts()
    fetchReviews()
    if(user) {
      fetchUserCart(user)
    } else {
      fetchCart()
    }
  }, [])

  const ScrollToTop = ({ children }) => {
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [children]);
  
    return children;
  };


  return (
    <>
    <SideNav/>
    <AdminNav/>
    <div className="admin-products-overlay"/>
    <div className="main-content">
      <Navbar
      key="navbar"
      />
      <Notifications/>
      <div className={location.pathname === "/" ? "home" : "routes"}>
      <Routes>
        <Route path="/" element={<Home/>}/>
        
        <Route path="/admin/dashboard" element={<AdminDashboard/>} />
        <Route path="/admin/orders" element={<AdminOrders/>} />
        <Route path="/admin/orders/:id" element={<AdminOrdersDetailsPage/>} />
        <Route path="/admin/customers" element={<AdminCustomers/>} />
        <Route path="/admin/customers/:id" element={<AdminCustomersDetailsPage/>} />
        <Route path="/admin/products" element={<AdminProducts/>} />
        <Route path="/admin/products/:id" element={<AdminProductsDetailsPage/>} />
        
        <Route path="/shop/products/:id/reviews" element={<Reviews/>} />
        <Route path="/shop/products/:id" element={<NewProductPage/>} />
        <Route path="/shop" element={<Shop/>} />
        
        <Route path="/cart/checkout" element={<Checkout/>} />
        <Route path="/cart/checkout/order-success" element={<OrderSuccess/>} />
        
        <Route path="/search/:id" element={<Search/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/cart" element={<Cart/>} />
        
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />

        <Route path="/confirm-account/:id" element={<ConfirmAccount/>} />
        
        <Route path="/reset-password" element={<RequestResetPassword/>} />
        <Route path="/reset-password/:id" element={<ResetPasswordLink/>} />
        
        <Route path="/profile" element={JSON.parse(localStorage.getItem('user')) ? <Profile /> : <Navigate to="/login"/>} />
        <Route path="/profile/order-history" element={JSON.parse(localStorage.getItem('user')) ? <OrderHistory/> : <Navigate to="/login"/>} />
        <Route path="/profile/order-history/:id" element={JSON.parse(localStorage.getItem('user')) ? <OrderPage/> : <Navigate to="/login"/>} />
        <Route path="/profile/change-password" element={JSON.parse(localStorage.getItem('user')) ? <ChangePassword/> : <Navigate to="/login"/>} />

        <Route path="*" element={<NotFound/>} />
        <Route path="/invalid-token" element={<InvalidToken/>} />
      </Routes>
      </div>
      {location.pathname !== "/" && <Footer/>}
    <BottomNavBar
    />
    </div>
    </>
  );
}

export default App;
