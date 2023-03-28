import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

// redux
import { useDispatch } from 'react-redux';
import { loginAuth } from '../../redux/slices/authSlice';

// chakra-ui
import { Spinner } from '@chakra-ui/react'

// styles
import './ConfirmAccount.css'

const CUSTOMERS_API_URL = '/api/user'

export default function ConfirmEmail() {
  const navigate = useNavigate();
  const { id } = useParams();

  // redux
  const dispatch = useDispatch();

  // state
  const [isConfirmed, setIsConfirmed] = useState(false);

  const fetchUser = async (user) => {
    try {
      const token = user.token;
      const id = user.id;
      const headers = {
          'Authorization': token
      };
      const response = await fetch('/api/user/'+id, { headers });
      const json = await response.json();
  
      if(response.ok) {
          // merge the json data with the user object
          const updatedUser = {...user, ...json}
          // update the state with the merged data
          dispatch(loginAuth(updatedUser))
          localStorage.setItem('user', JSON.stringify(updatedUser))
      }
  
      if(!response.ok) {
          // remove the user from local storage
          localStorage.removeItem('user')
          // update the state with the merged data
          dispatch(loginAuth(null))
      }
  
    } catch (e) {
      // fix this error. user is sometimes undefined
      console.log(e)
    }
      };

  const confirmAccount = async () => {
    const response = await fetch(`${CUSTOMERS_API_URL}/confirm-account/${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    setIsConfirmed(true);
    if (response.ok) {
      const user = JSON.parse(localStorage.getItem('user'))
      if (user) {
          try {
          fetchUser(user)
          } catch(err) {
            console.log(err)
          }
      }
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
