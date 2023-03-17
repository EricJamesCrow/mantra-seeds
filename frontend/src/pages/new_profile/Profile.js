import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useLogout } from '../../hooks/useLogout'

// redux
import { useSelector } from "react-redux"

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
    
    const handleLogout = () => {
        navigate('/')
        logout()
    }

    const handleClick = (link) => {
        navigate(link)
    }

    const userProfileBtns = [
        {id: 1, icon: faHistory, text: 'Order History', onClick: () => handleClick('/profile/order-history')},
        {id: 2, icon: faUnlockKeyhole, text: 'Change Password', onClick: () => handleClick('/profile/change-password')},
        {id: 3, icon: faSignOutAlt, text:"Logout", onClick: handleLogout}
    ]

  return (
    <div className="profile-container">
        <div>Profile</div>
        <div className="user-profile-container">
            <div className="avatar-and-info">
                <Avatar name='Eric Crow' w='16' h='16'/>
                <div className='name-and-email-container'>
                    <div>Eric Crow</div>
                    <div>{user.email}</div>
                </div>
            </div>
            <EditIcon w='7' h='7' color='#fff'/>
        </div>
        <div className="user-profile-btns-container">
            {userProfileBtns.map(btn => (
            <div className="user-profile-btn" onClick={btn.onClick}>
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
  )
}
