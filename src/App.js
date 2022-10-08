// react
import { BrowserRouter, Route, Routes } from 'react-router-dom'

// styles
import './App.css';

// components
import Navbar from './components/Navbar';
import BottomNavBar from './components/BottomNavBar'

// pages
import Home from "./pages/home/Home"
import Admin from "./pages/admin/Admin"
import Shop from "./pages/shop/Shop"
import Contact from "./pages/contact/Contact"

function App() {

  return (
    <>
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin/>} />
        <Route path="/shop" element={<Shop/>} />
        <Route path="/contact" element={<Contact/>} />
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
