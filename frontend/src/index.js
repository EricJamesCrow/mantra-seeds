import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ProductsContextProvider } from './context/ProductContext';
import { AuthContextProvider } from './context/AuthContext';
import { CartContextProvider } from './context/CartContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
    <ProductsContextProvider>
    <CartContextProvider>
    <App />
    </CartContextProvider>
    </ProductsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
