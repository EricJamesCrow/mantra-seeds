import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

// chakra-ui
import { Spinner } from '@chakra-ui/react'

// styles
import './ConfirmAccount.css'

const CUSTOMERS_API_URL = '/api/user'

export default function ConfirmEmail() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [isConfirmed, setIsConfirmed] = useState(false);

  const confirmAccount = async () => {
    const response = await fetch(`${CUSTOMERS_API_URL}/confirm-account/${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    setIsConfirmed(true);
    if (response.ok) {
      navigate('/profile');
    }
  };

  useEffect(() => {
    if (!isConfirmed) {
      setTimeout(() => {
        confirmAccount();
      }, 1500);
    }
  }, []);

  return (
    <div className="confirm-account-container">
      <Spinner
      thickness='4px'
      speed='0.65s'
      emptyColor='gray.200'
      color='blue.500'
      boxSize='200px'
      />
      <h1>Confirming account...</h1>
    </div>
  )
}
