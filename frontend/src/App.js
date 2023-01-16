// react
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import React, { useState, useRef, useEffect } from 'react';
import { useAuthContext } from './hooks/useAuthContext';

// styles
import './App.css';

// components
import Navbar from './components/Navbar';
import BottomNavBar from './components/BottomNavBar'
import Profile from './pages/profile/Profile'
import EditProductModel from "./pages/admin/components/EditProductModel"
import ProductPage from "./components/ProductPage"

// pages
import Home from "./pages/home/Home"
import Admin from "./pages/admin/Admin"
import Shop from "./pages/shop/Shop"
import Contact from "./pages/contact/Contact"
import Cart from "./pages/cart/Cart"
import Checkout from "./pages/checkout/Checkout"

function App() {
  const [filter, setFilter] = useState([])
  const { user } = useAuthContext()
  const ChildRef = useRef([]);

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

  const DoSomethingWrapper = ({ children }) => {
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
      <Navbar
      key={"navbar"}
      updateFilter={updateFilter}
      ref={theRef => ChildRef["navbar"] = theRef}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin/>} />
        {user && user.role === 1 ?  <Route path="/admin/products/:id" element={<EditProductModel/>} /> : null}
        <Route path="/shop/products/:id" element={<ScrollToTop><ProductPage/></ScrollToTop>} />
        <Route path="/shop" element={<Shop filter={filter}/>} />
        <Route path="/cart/checkout" element={<ScrollToTop><Checkout/></ScrollToTop>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/cart" element={<ScrollToTop><Cart/></ScrollToTop>} />
        <Route path="/profile" 
        element={JSON.parse(localStorage.getItem('user')) ? <ScrollToTop><Profile/></ScrollToTop> : <DoSomethingWrapper><Navigate to="/"/></DoSomethingWrapper>} 
        />
      </Routes>
      <div className="copyright">
      <div>© Mantra Seeds 2022</div>
    </div>
    <BottomNavBar
    hideLogin={hideLogin}
    />
    </BrowserRouter>
    </>
  );
}

export default App;
