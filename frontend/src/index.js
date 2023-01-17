import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ProductsContextProvider } from './context/ProductContext';
import { AuthContextProvider } from './context/AuthContext';
import { CartContextProvider } from './context/CartContext';
import { ShippingContextProvider } from './context/ShippingContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
    <ProductsContextProvider>
    <CartContextProvider>
    <ShippingContextProvider>
    <App />
    </ShippingContextProvider>
    </CartContextProvider>
    </ProductsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
