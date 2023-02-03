import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store'
import { ProductsContextProvider } from './context/ProductContext';
import { AuthContextProvider } from './context/AuthContext';
import { CartContextProvider } from './context/CartContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <AuthContextProvider>
    <ProductsContextProvider>
    <CartContextProvider>
    <App />
    </CartContextProvider>
    </ProductsContextProvider>
    </AuthContextProvider>
    </Provider>
  </React.StrictMode>
);
