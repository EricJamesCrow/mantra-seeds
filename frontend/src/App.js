// react
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useState } from 'react';

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

  const updateFilter = term => {
    var index = filter.indexOf(term);
    if(index !== -1) {
      var filterFiltered = filter.filter(v => v !== term)
      setFilter(filterFiltered)
    } else {
      setFilter(prevArray => [...prevArray, term])
    }
  }


  return (
    <>
    <BrowserRouter>
      <Navbar
      updateFilter={updateFilter}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin/>} />
        <Route path="/shop" element={<Shop filter={filter}/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/profile" element={<Profile/>} />
      </Routes>
      <div className="copyright">
      <div>© Mantra Seeds 2022</div>
    </div>
    <BottomNavBar/>
    </BrowserRouter>
    </>
  );
}

export default App;
