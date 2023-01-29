import React, { useEffect, useState } from 'react'

export default function PayPal() {
    const [sdkReady, setSdkReady] = useState(false)

    useEffect(() => {
        const addPayPal = async () => {
            const response = await fetch('/api/paypal/config');
            const clientId = await response.text();
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
            addPayPal()
        } else {
            setSdkReady(true)
        }
    }, [])

  return (
    <div>PayPal</div>
  )
}
