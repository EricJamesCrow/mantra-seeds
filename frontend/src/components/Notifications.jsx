import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// redux
import { useSelector } from 'react-redux';

// chakra ui
import { useToast } from '@chakra-ui/react'

export default function Notifications() {
    const navigate = useNavigate();
    const addToCartTriggered = useSelector(state => state.notifications.addToCartTriggered);
    const removedItemTriggered = useSelector(state => state.notifications.removedItemTriggered);
    const toast = useToast();

    useEffect(() => {
        const showToast = () => {
          toast({
            title: "Item added to cart",
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
              title: "Item removed from cart",
              description: "Item has been removed from your cart.",
              status: 'error',
              duration: 1500,
              isClosable: true
            });
          };
          if(removedItemTriggered) showToast();
    }, [removedItemTriggered])
      
  return null
}
