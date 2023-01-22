import React from 'react'

import './ConfirmingOrder.css'

// hooks
import { useAuthContext } from '../../hooks/useAuthContext';
import { useShippingContext } from '../../hooks/useShippingContext';
import { useCartContext } from '../../hooks/useCartContext';

export default function ConfirmingOrder() {
    const { user } = useAuthContext()
    const { shipping, dispatchShipping } = useShippingContext()
    const { cart, dispatchCart } = useCartContext()

    // const token = user.token

    const createOrder = async () => {
        const response = await fetch("/api/orders/", {
          method: "POST",
          body: JSON.stringify({
            user: cart.user,
            address: { 
              firstName: shipping.firstName,
              lastName: shipping.lastName,
              street: shipping.address,
              city: shipping.city,
              state: shipping.state,
              zip: shipping.zip
            },
            items: cart.cartItems,
            shipping: {
              delivery: shipping.shippingName,
              price: shipping.shippingPrice,
              expected: shipping.shippingPrice // fix this, need expected delivery date
            },
            email: shipping.email,
            payment: 'Stripe'
          }),
          headers: { 
            // "Authorization": token,
            "Content-Type": "application/json" },
        });
        const data = await response.json();
        if (response.ok) {
          console.log("Order created successfully!");
        } else {
          console.log("Failed to create order: " + data.error);
        }
    }

  return (
    <>
    <div>ConfirmingOrder</div>
    </>
  )
}
