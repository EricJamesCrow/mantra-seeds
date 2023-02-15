// react
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import React, { useState, useRef, useEffect } from 'react';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { setCart } from './redux/slices/cartSlice';
import { setProducts } from './redux/slices/productSlice';
import { loginAuth } from './redux/slices/authSlice';
import { setOrders } from './redux/slices/ordersSlice';
import { setCustomers } from './redux/slices/customersSlice';

// styles
import './App.css';

// components
import Navbar from './components/Navbar';
import SideNav from './components/SideNav';
import AdminNav from './pages/new_admin/components/AdminNav';
import BottomNavBar from './components/BottomNavBar'
import EditProductModel from "./pages/admin/components/EditProductModel"
import ProductPage from "./components/ProductPage"

// pages
import Home from "./pages/home/Home"
import AdminDashboard from "./pages/new_admin/pages/AdminDashboard"
import AdminOrders from "./pages/new_admin/pages/AdminOrders"
import AdminOrdersDetailsPage from './pages/new_admin/pages/AdminOrdersDetailsPage';
import AdminCustomers from './pages/new_admin/pages/AdminCustomers'
import AdminCustomersDetailsPage from './pages/new_admin/pages/AdminCustomerDetailsPage'
import AdminProducts from './pages/new_admin/pages/AdminProducts'
import Shop from "./pages/shop/Shop"
import Cart from "./pages/cart/Cart"
import Checkout from "./pages/checkout/Checkout"
import OrderSuccess from './pages/checkout/OrderSuccess'
import Profile from './pages/profile/Profile'
import Contact from "./pages/contact/Contact"

const PRODUCTS_API_URL = '/api/products/'
const ORDERS_API_URL = '/api/orders'
const CUSTOMERS_API_URL = '/api/user'

function App() {
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();

  const [filter, setFilter] = useState([])
  const ChildRef = useRef([]);

  const fetchUser = async (user) => {
  try {
    const token = user.token
    const id = user.id
    const headers = {
        'Authorization': token
    }
    const response = await fetch('/api/user/'+id, { headers });
    const json = await response.json();

    if(response.ok) {
        // merge the json data with the user object
        const updatedUser = {...user, ...json}
        // update the state with the merged data
        dispatch(loginAuth(updatedUser))
    }

  } catch (e) {
    // fix this error. user is sometimes undefined
    console.log(e)
  }
    }

  const fetchCart = async (user) => {
    const response = await fetch('/api/carts/'+user.cart)
    const json = await response.json()

    if (response.ok) {
      dispatch(setCart(json))
    }
  }

  const fetchProducts = async () => {
    const response = await fetch(PRODUCTS_API_URL)
    const json = await response.json()

    if (response.ok) {
      dispatch(setProducts(json))
    }
  }

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
    if(user) {
      fetchCart(user)
    }
    if(user.role === 1) {
      fetchOrders(user)
      fetchCustomers(user)
    }
    fetchUser()
    fetchProducts()
  }, [])

  const updateFilter = term => {
    var index = filter.indexOf(term);
    if(index !== -1) {
      var filterFiltered = filter.filter(v => v !== term)
      setFilter(filterFiltered)
    } else {
      setFilter(prevArray => [...prevArray, term])
    }
  }

  const showLogin = () => {
    ChildRef.navbar.callChildFunction()
  }

  const hideLogin = () => {
    ChildRef.navbar.bottomNavBarFunction()
  }

  const ShowLoginWrapper = ({ children }) => {
    useEffect(() => {
      showLogin();
    }, []);
    return children;
  };

  const ScrollToTop = ({ children }) => {
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [children]);
  
    return children;
  };


  return (
    <>
    <BrowserRouter>
    <SideNav/>
    <AdminNav/>
    <div className="main-content">
      <Navbar
      key={"navbar"}
      updateFilter={updateFilter}
      ref={theRef => ChildRef["navbar"] = theRef}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/dashboard" element={<AdminDashboard/>} />
        <Route path="/admin/orders" element={<AdminOrders/>} />
        <Route path="/admin/orders/:id" element={<AdminOrdersDetailsPage/>} />
        <Route path="/admin/customers" element={<AdminCustomers/>} />
        <Route path="/admin/customers/:id" element={<AdminCustomersDetailsPage/>} />
        <Route path="/admin/products" element={<AdminProducts/>} />
        {user && user.role === 1 ?  <Route path="/admin/products/:id" element={<EditProductModel/>} /> : null}
        <Route path="/shop/products/:id" element={<ScrollToTop><ProductPage/></ScrollToTop>} />
        <Route path="/shop" element={<Shop filter={filter}/>} />
        <Route path="/cart/checkout" element={<ScrollToTop><Checkout/></ScrollToTop>} />
        <Route path="/cart/checkout/order-success" element={<ScrollToTop><OrderSuccess/></ScrollToTop>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/cart" element={<ScrollToTop><Cart/></ScrollToTop>} />
        <Route path="/profile" 
        element={JSON.parse(localStorage.getItem('user')) ? <ScrollToTop><Profile/></ScrollToTop> : <ShowLoginWrapper><Navigate to="/"/></ShowLoginWrapper>} 
        />
      </Routes>
      <div className="copyright">
      <div>© Mantra Seeds 2022</div>
    </div>
    <BottomNavBar
    hideLogin={hideLogin}
    />
    </div>
    </BrowserRouter>
    </>
  );
}

export default App;
