import React, { useEffect, useState } from 'react'

import { PayPalButton } from 'react-paypal-button-v2'

export default function PayPal() {
    const [sdkReady, setSdkReady] = useState(false)
    const [sandbox, setSandbox] = useState(null)

    const client = {
        sandbox:    'AaZYptpCecbCor3xhuoxwndN4yi0ohmRqWRhfB5qIAnsioQEwhDd64kasyEqsbSMt0rcuGY1zQiVj1w4',
        production: 'YOUR-PRODUCTION-APP-ID',
    }

    useEffect(() => {
        const addPayPal = async () => {
            const response = await fetch('/api/paypal/config');
            const clientId = await response.text();
            setSandbox(clientId)
            const script = document.createElement('script');
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true
            script.onload = () => {
                setSdkReady(true)
            }
            document.body.appendChild(script)
        }
        if(!window.paypal) {
            console.log('!window.paypal triggered')
            addPayPal()
        } else {
            console.log('The else statement was triggered')
            setSdkReady(true)
        }
    }, [])

  return (
    <>
    {sdkReady && 
    <>
    <PayPalButton 
    amount={2209} 
    />
    </>
    }
    </>
  )
}
