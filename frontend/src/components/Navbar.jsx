// react
import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux';

// styles
import "./Navbar.css"

// images
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faCartShopping, faSearch } from '@fortawesome/free-solid-svg-icons'

// components
import SearchModel from "./SearchModel"
import LoginModel from "./LoginModel"
import SignupModel from "./SignupModel"

const Navbar = forwardRef(( {}, ref ) => {
    const location = useLocation()

    const [searchModelOpen, setSearchModelOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const [showLogin, setShowLogin] = useState(false)
    const [showSignup, setShowSignup] = useState(false)

    const user = useSelector(state => state.auth.user);

    useImperativeHandle(ref, () =>({
        callChildFunction() {
            setShowLogin(true)
        },
        bottomNavBarFunction() { 
            setShowLogin(false)
            setShowSignup(false)     
        }
      }))

    const showSignupFields = () => {
        setShowLogin(!showLogin)
        setShowSignup(!showSignup)
    }

    const displayMobileMenu = () => {
        document.querySelector('.side-nav').classList.toggle('open')
        document.querySelector('.main-content').classList.toggle('push');
    }

    const showSearch = () => {
        setSearchModelOpen(true)
    }

    useEffect(() => {
        if (searchModelOpen) {
          setTimeout(() => {
            // timeout allows css transition to still display for SearchModel
            document.querySelector(".search-model").classList.toggle("open");
          }, 0);
        }
      }, [searchModelOpen]);

    const hideSearch = () => {
        setSearchModelOpen(false)
    };

    useEffect(() => {
        if(showLogin || showSignup) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "scroll";
        }
    })

    useEffect(() => {
        function handleScroll() {
          setIsScrolled(window.pageYOffset > 0);
        }
    
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
      }, []);

  return (
    <>
    {searchModelOpen && <SearchModel hideSearch={hideSearch}/>}
    <nav className='sticky-nav'>
    <div className={location.pathname === "/" && isScrolled ? 'navbar-container background' : location.pathname === "/" && !isScrolled ? 'navbar-container' : 'navbar-container background'}>
        <div className="logo-container">
        {/* <img src={Cannabis} className="cannabis"/> */}
        <Link to="/" className="title" onClick={hideSearch}>MANTRA SEEDS</Link>
        </div>
        <button href="#" className="toggle-button" onClick={displayMobileMenu}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
        </button>
        <div className="navbar-links">
            <ul>
            <li>
                <NavLink to="/" onClick={hideSearch}>Home</NavLink>
            </li>
            {user && user.role === 1 &&
            <li>
            <NavLink to="/admin/dashboard" onClick={hideSearch}>Admin</NavLink>
            </li>
            }
            <li>
                <NavLink to="/shop" onClick={hideSearch}>Shop</NavLink>
            </li>
            <li>
                <NavLink to="/contact" onClick={hideSearch}>Contact</NavLink>
            </li>
            <li>
            <FontAwesomeIcon 
            icon={faSearch} 
            style={{
                fontSize: "1.6rem",
                padding: "15px 20px",
                cursor: "pointer"}}
            onClick={showSearch}
            />
            </li>
            <li>
                <NavLink to="/profile" onClick={hideSearch}> 
                <FontAwesomeIcon 
            icon={faUser} 
            style={{
                fontSize: "1.6rem",
                padding: "15px 20px",
                cursor: "pointer"}}/>
                </NavLink>
                </li>
            <li>
                <NavLink to="/cart" onClick={hideSearch}>
                <FontAwesomeIcon 
            icon={faCartShopping} 
            style={{
                fontSize: "1.6rem",
                padding: "15px 20px",
                cursor: "pointer"}}/>
                </NavLink>
                </li>
            </ul>
        </div>
    </div>
    {!user && showLogin && <LoginModel
    showSignupFields={showSignupFields}
    setShowLogin={setShowLogin}
    />}
    {!user && showSignup && 
    <SignupModel
    showSignupFields={showSignupFields}
    setShowSignup={setShowSignup}
    />}
    </nav>
    </>
  )
})

export default Navbar

