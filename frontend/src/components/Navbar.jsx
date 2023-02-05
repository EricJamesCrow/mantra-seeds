// react
import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux';

// styles
import "./Navbar.css"

// images
import Cannabis from "../images/cannabis-leaf.svg"

// components
import Sidebar from "./Sidebar"
import LoginModel from "./LoginModel"
import SignupModel from "./SignupModel"

const Navbar = forwardRef(( { updateFilter }, ref ) => {
    const [showModal, setShowModal] = useState(false)
    
    const [isShopping, setIsShopping] = useState(false)
    const location = useLocation();

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

    const shopping = () => {
        if(location.pathname === "/shop") {
            setIsShopping(true)
        } else {
            setIsShopping(false)
        }
    }

    const showSignupFields = () => {
        setShowLogin(!showLogin)
        setShowSignup(!showSignup)
    }


    useEffect(() => {
        shopping()
    })

    const runShowModal = () => {
        setShowModal(!showModal)
    }

    const displayMobileMenu = () => {
        document.querySelector('.side-nav').classList.toggle('open')
        document.querySelector('.main-content').classList.toggle('push');
    }

    useEffect(() => {
        if(showLogin || showSignup) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "scroll";
        }
    })

  return (
    <>
    <nav className='sticky-nav'>
    <div className="navbar-container">
        <div className="logo-container">
        <img src={Cannabis} className="cannabis"/>
        <Link to="/" className="title">MantraSeeds</Link>
        </div>
        <button href="#" className={"toggle-button"} onClick={displayMobileMenu}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
        </button>

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
    {isShopping && !showLogin &&
        <div className="store-banner">
        <div className="store-header">Store</div>
        <button className="filter-products-mobile">
          <div onClick={runShowModal}>Filter Products</div>
        </button>
    </div>
    }
    {showModal && isShopping &&
    <div className="filter-products__modal">
    <Sidebar
    updateFilter={updateFilter}
    />
    </div>
    }
    </nav>
    </>
  )
})

export default Navbar

