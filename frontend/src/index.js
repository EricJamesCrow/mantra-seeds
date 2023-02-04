import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store'
import { ProductsContextProvider } from './context/ProductContext';
import { AuthContextProvider } from './context/AuthContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <AuthContextProvider>
    <ProductsContextProvider>
    <App />
    </ProductsContextProvider>
    </AuthContextProvider>
    </Provider>
  </React.StrictMode>
);
