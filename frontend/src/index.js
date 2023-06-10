import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store'
import 'font-awesome/css/font-awesome.min.css';

// chakra ui components
import { ChakraProvider } from '@chakra-ui/react'

// react helmet
import { HelmetProvider } from 'react-helmet-async';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HelmetProvider>
    <ChakraProvider>
    <Provider store={store}>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </Provider>
    </ChakraProvider>
    </HelmetProvider>
  </React.StrictMode>
);
