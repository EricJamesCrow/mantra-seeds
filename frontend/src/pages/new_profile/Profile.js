import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useLogout } from '../../hooks/useLogout'

// chakra ui
import { Alert, AlertIcon } from '@chakra-ui/react'

// redux
import { useSelector } from "react-redux"

// loading
import Loading from '../../components/loading/loading'

// styles
import './Profile.css'

// images
import { Avatar } from '@chakra-ui/react'
import { EditIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHistory, faUnlockKeyhole, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

export default function Profile() {
    const user = useSelector(state => state.auth.user);
    let navigate = useNavigate()
    const { logout } = useLogout()
    if(!user) return <Loading />;
    const showAlert = !user.emailConfirmed
    
    const handleLogout = () => {
        navigate('/')
        logout()
    }

    const handleClick = (link) => {
        navigate(link)
    }

    const userProfileBtns = [
        {id: 1, icon: faHistory, text: 'Order History', onClick: () => handleClick('/profile/order-history'), label: 'order-history'},
        {id: 2, icon: faUnlockKeyhole, text: 'Change Password', onClick: () => handleClick('/profile/change-password'), label: 'change-password'},
        {id: 3, icon: faSignOutAlt, text:"Logout", onClick: handleLogout, label: 'logout'}
    ]

  return (
    <div className="profile-wrapper">
        {showAlert && 
        <Alert status='warning' className='alert-banner'>
            <AlertIcon />
            Please check your email and click on the confirmation link to activate your account.
        </Alert>}
        <div className="profile-container">
            <div>Profile</div>
            <div className="user-profile-and-btns-wrapper">
                <div className="user-profile-container">
                    <div className="avatar-and-info">
                        <Avatar name='' w='16' h='16'/>
                        <div className='name-and-email-container'>
                            <div></div>
                            <div>{user.email}</div>
                        </div>
                    </div>
                    <EditIcon w='7' h='7' color='#fff'/>
                </div>
                <div className="user-profile-btns-container">
                    {userProfileBtns.map(btn => (
                    <div className="user-profile-btn" onClick={btn.onClick} aria-label={btn.label}>
                        <div>
                            <div>
                                <FontAwesomeIcon
                                    icon={btn.icon}
                                    color='#669C54'
                                    />
                            </div>
                            <div>{btn.text}</div>
                        </div>
                        <ChevronRightIcon w='7' h='7' color='#ABABAB'/>
                    </div>
                    ))}
                </div>
            </div>
    </div>
    </div>
  )
}
