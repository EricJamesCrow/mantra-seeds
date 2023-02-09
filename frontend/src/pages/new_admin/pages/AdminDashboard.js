import React from 'react'


// styles
import './AdminDashboard.css'

// images
import { faUsers, faShoppingCart, faBoxOpen } from '@fortawesome/free-solid-svg-icons'

// components
import AdminHeader from '../components/AdminHeader'
import ContentCard from '../components/ContentCard'

export default function AdminDashboard() {
  const cardData = [
    { id: 1, title: 'Customers', value: 44, percentage: '-12.5%', icon: faUsers },
    { id: 2, title: 'Orders', value: 120, percentage: '15%', icon: faShoppingCart },
    { id: 3, title: 'Products', value: 500, percentage: '2%', icon: faBoxOpen },
  ];

  return (
    <>
    <AdminHeader/>
    <div className="admin-dashboard-cards-container">
    {cardData.map(item => (
      <ContentCard 
      key={item.id}
      title={item.title}
      value={item.value}
      percentage={item.percentage}
      icon={item.icon}
      />
    ))
    }
    </div>
    </>
  )
}
