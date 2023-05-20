import React from 'react'

// styles
import './PrivacyPolicy.css'

export default function PrivacyPolicy() {
  return (
    <div className="privacy-policy-container">
        <h1>Privacy Policy</h1>
        <div className="privacy-policy-content">
          <h1>1. Information We Collect</h1>
          <p>We collect your email address when you sign up. Additionally, for the purpose of processing orders, we collect your email address and physical address. These details associated with your order are the only pieces of personally identifiable information we collect and encrypt. We assure you that these data are securely stored, as detailed in our Data Security section.</p>
          
          <h1>2. How We Use Your Information</h1>
          <p>We use your email to communicate with you and to send you important notifications. Your address is used to fulfill your orders. We don’t use this information for any other purposes and we don’t share it with third parties.</p>
          
          <h1>3. Data Security</h1>
          <p>We prioritize the security of your data. Specifically, the email address and physical address that you provide for the purpose of placing an order are encrypted using AES-256-GCM before being stored in our database. This high-level encryption ensures your data remains protected. Only authorized administrators have the necessary permissions to decrypt this information. This measure guarantees that even in the unlikely event of a security breach, your personal data remains safe.</p>
          
          <h1>4. Cookies and Local Storage</h1>
          <p>We use "cookies" for a cart object in local storage when you are a guest, and a user object when you are logged in. This is the only data that gets stored in local storage. It is used to provide a better user experience and is necessary for the proper functioning of our website.</p>

          <h1>5. Payments</h1>
          <p>We use PayPal, and potentially other third-party APIs such as Stripe, for processing payments. We do not handle or store your credit card information directly. When you make a payment, you are redirected to the payment service provider’s website where you provide your payment details. These service providers are responsible for the security of your data during these transactions.</p>

          <h1>6. Changes to the Privacy Policy</h1>
          <p>Mantra Seeds reserves the right to modify this Privacy Policy at any time. We will always post the most current version of this Policy on our website. If we make material changes, we will notify you. By continuing to use our services after changes become effective, you agree to these changes.</p>

          <h1>7. Contact Us</h1>
          <p>If you have any questions about this Privacy Policy, please contact us at [email].</p>
        </div>
    </div>
  )
}
