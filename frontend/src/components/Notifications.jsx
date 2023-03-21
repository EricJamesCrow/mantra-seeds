import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// redux
import { useSelector, useDispatch } from 'react-redux';

// chakra ui
import { useToast } from '@chakra-ui/react'

export default function Notifications() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const addToCart = useSelector(state => state.notifications.addToCart);
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
            duration: 3000,
            isClosable: true
          });
        };
        if(addToCart) showToast();
      }, [addToCart]);
      
  return null
}
