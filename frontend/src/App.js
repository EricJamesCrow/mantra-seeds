// react
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import React, { useState, useRef, useEffect } from 'react';
import { useAuthContext } from './hooks/useAuthContext';
import { useProductsContext } from "./hooks/useProductsContext"

// styles
import './App.css';

// components
import Navbar from './components/Navbar';
import BottomNavBar from './components/BottomNavBar'
import Login from './pages/user/Login'
import Signup from './pages/user/Signup'
import Profile from './pages/profile/Profile'

// pages
import Home from "./pages/home/Home"
import Admin from "./pages/admin/Admin"
import Shop from "./pages/shop/Shop"
import Contact from "./pages/contact/Contact"

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
        <Route path="/shop" element={<Shop filter={filter}/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/login" element={!user ? <Login/> : <Navigate to="/profile"/>} />
        <Route path="/signup" element={!user ? <Signup/> : <Navigate to="/profile"/>} />
        <Route path="/profile" 
        element={JSON.parse(localStorage.getItem('user')) ? <Profile/> : <DoSomethingWrapper><Navigate to="/"/></DoSomethingWrapper>} 
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
