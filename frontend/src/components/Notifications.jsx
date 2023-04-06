import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

// redux
import { useSelector } from 'react-redux';

// chakra ui
import { useToast } from '@chakra-ui/react'

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export default function Notifications() {
    const navigate = useNavigate();
    const cart = useSelector(state => state.cart);
    const products = useSelector(state => state.products.products);
    const cartItems = cart.cartItems;
    const addToCartTriggered = useSelector(state => state.notifications.addToCartTriggered);
    const removedItemTriggered = useSelector(state => state.notifications.removedItemTriggered);
    const removedItem = useSelector(state => state.notifications.removedItem);
    const bannedCustomerTriggered = useSelector(state => state.notifications.bannedCustomerTriggered);
    const bannedCustomer = useSelector(state => state.notifications.bannedCustomer);
    const errorTriggered = useSelector(state => state.notifications.errorTriggered);
    const errorName = useSelector(state => state.notifications.errorName);
    const successTriggered = useSelector(state => state.notifications.successTriggered);
    const successName = useSelector(state => state.notifications.successName);
    const toast = useToast();

    const prevCartItems = usePrevious(cartItems);

    useEffect(() => {
        const showToast = () => {
          if (!prevCartItems) {
            const productId = cartItems[0].product;
            const productName = products.find((product) => product._id === productId).name
            return (toast({
              title: `${productName} added to cart`,
              description: (
                  <div onClick={() => {navigate("/cart")}}
                  style={{
                      textDecoration: "underline",
                      cursor: "pointer",
                    }}>Click here to view cart.</div>
              ),
              status: "success",
              duration: 1500,
              isClosable: true
            }))
          } ;

          const updatedItem = cartItems.find((currentItem, index) => {
            const prevItem = prevCartItems[index];
            return !prevItem || prevItem.quantity !== currentItem.quantity;
          });
    
          const productId = updatedItem ? updatedItem.product : cartItems[cartItems.length - 1].product;
          const productName = products.find((product) => product._id === productId).name;

          toast({
            title: `${productName} added to cart`,
            description: (
                <div onClick={() => {navigate("/cart")}}
                style={{
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}>Click here to view cart.</div>
            ),
            status: "success",
            duration: 1500,
            isClosable: true
          });
        };
        if(addToCartTriggered) showToast();
      }, [addToCartTriggered]);

    useEffect(() => {
        const showToast = () => {
            toast({
              title: `${removedItem} removed from cart`,
              description: "Item has been removed from your cart.",
              status: 'error',
              duration: 1500,
              isClosable: true
            });
          };
          if(removedItemTriggered) showToast();
    }, [removedItemTriggered])

    useEffect(() => {
        const showToast = () => {
            toast({
              title: "Customer banned",
              description: `${bannedCustomer}`,
              status: 'error',
              duration: 1500,
              isClosable: true
            });
          };
          if(bannedCustomerTriggered) showToast();
    }, [bannedCustomerTriggered])

    useEffect(() => {
        const showToast = () => {
            toast({
              title: "Error",
              description: `${errorName}`,
              status: 'error',
              duration: 1500,
              isClosable: true
            });
          };
          if(errorTriggered) showToast();
    }, [errorTriggered])

    useEffect(() => {
        const showToast = () => {
            toast({
              title: "Success",
              description: `${successName}`,
              status: 'success',
              duration: 1500,
              isClosable: true
            });
          };
          if(successTriggered) showToast();
    }, [successTriggered])
      
  return null
}
