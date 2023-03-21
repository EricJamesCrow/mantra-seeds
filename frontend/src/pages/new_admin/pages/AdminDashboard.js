import React from 'react'

// redux
import { useSelector } from 'react-redux'

// styles
import './AdminDashboard.css'

// images
import { faUsers, faShoppingCart, faBoxOpen } from '@fortawesome/free-solid-svg-icons'

// components
import AdminHeader from '../components/AdminHeader'
import SideBar from '../components/SideBar'
import ContentCard from '../components/ContentCard'

export default function AdminDashboard() {
  const { products } = useSelector(state => state.products)
  const { orders } = useSelector(state => state.orders)
  const customers = useSelector(state => state.customers.customers);

  const cardData = [
    { id: 1, title: 'Customers', value: customers.length, percentage: '-12.5%', icon: faUsers },
    { id: 2, title: 'Orders', value: orders.length, percentage: '15%', icon: faShoppingCart },
    { id: 3, title: 'Products', value: products.length, percentage: '2%', icon: faBoxOpen },
  ];

  return (
    <>
    <div className='admin-side-bar-main-content-container'>
    <SideBar/>
    <div className="admin-main-content">
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
    </div>
    </div>
    </>
  )
}
