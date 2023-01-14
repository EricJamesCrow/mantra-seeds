import { useAuthContext } from "../../hooks/useAuthContext"
import { useProductsContext } from "../../hooks/useProductsContext"
import { Link, useNavigate } from 'react-router-dom'
import { useLogout } from '../../hooks/useLogout'

// react
import React, { useEffect } from "react"

// components
import Product from "../../components/Product"

// styles
import "./Profile.css"

// images
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faShoppingCart, faUser, faList } from '@fortawesome/free-solid-svg-icons'

const PRODUCTS_API_URL = '/api/products/'


export default function Profile() {
  const { user } = useAuthContext()
  let navigate = useNavigate()
  const {products, dispatch} = useProductsContext()

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(PRODUCTS_API_URL)
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_PRODUCTS', payload: json})
      }
    }

    fetchProducts()
  }, [])

  const { logout } = useLogout()

  const handleClick = () => {
    navigate('/')
    logout()
  }

  String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

  const obj = {
    "orders": faMagnifyingGlass,
    "cart": faShoppingCart,
    "account": faUser,
    "list": faList
  }

  return (
    <div>
      {user && <>
      <div className="profile-header">
      <span>Hello, {user.email}</span>
      <button onClick={handleClick}>Logout</button>
      </div>
      <div className="profile-buttons">
      {Object.entries(obj)
        .map( ([key, value]) => <Link to={`/${key}`}>Your {key.toProperCase()}
            <FontAwesomeIcon
            icon={value}
            />
            </Link>)}
      </div>
      <div className="quick-account-access">
        <div className="quick-account-access-text">Your Orders</div>
        <div className="media-scroller">
        {
          products && products.map(product => <Product key={product.id} item={product}/>)
        }
        </div>
        <div className="div-span"></div>
        <div className="quick-account-access-text">Your Cart</div>
        <div className="media-scroller">
        {
          products && products.map(product => <Product key={product.id} item={product}/>)
        }
        </div>
        <div className="div-span"></div>
        <div className="quick-account-access-text">Your Account</div>
        <div className="media-scroller">
        {
          products && products.map(product => <Product key={product.id} item={product}/>)
        }
        </div>
        <div className="div-span"></div>
        <div className="quick-account-access-text">Your Lists</div>
        <div className="media-scroller">
        {
          products && products.map(product => <Product key={product.id} item={product}/>)
        }
        </div>
      </div>
      </>
      }
      {!user && 
      <div style={{paddingTop: "200px", paddingBottom: "280px", display: 'grid', textAlign: 'center'}}>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
      </div>
      }
    </div>
  )
}
