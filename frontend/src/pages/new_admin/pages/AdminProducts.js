import React from 'react'

// components
import AdminHeader from '../components/AdminHeader'
import FilterSort from '../components/FilterSort'
import SideBar from '../components/SideBar'
import ProductCard from '../components/ProductCard'

export default function AdminProducts() {
  const products = [
    { id: "product", cardId: 'id: 63c621a4f4807cbbc873be70', dateCreated: "15 Jul 2020, 16:00", var1: 'Sativa Seeds', var2: 'active', var3: 20211, var4: '5', var5: 'In Stock'},
    { id: "product", cardId: 'id: 63c621a4f4807cbbc873be70', dateCreated: "15 Jul 2020, 16:00", var1: 'Sativa Seeds', var2: 'active', var3: 20211, var4: '5', var5: 'In Stock'},
    { id: "product", cardId: 'id: 63c621a4f4807cbbc873be70', dateCreated: "15 Jul 2020, 16:00", var1: 'Sativa Seeds', var2: 'active', var3: 20211, var4: '5', var5: 'In Stock'},
    { id: "product", cardId: 'id: 63c621a4f4807cbbc873be70', dateCreated: "15 Jul 2020, 16:00", var1: 'Sativa Seeds', var2: 'active', var3: 20211, var4: '5', var5: 'In Stock'},

  ]
  return (
    <>
    <div className='admin-side-bar-main-content-container'>
    <SideBar/>
    <div className="admin-main-content">
    <AdminHeader/>
    <FilterSort results={products.length}/>
    <div className="display-admin-orders">
    {products.map(item => (
      <ProductCard 
      key={item.id}
      item={item}
      />
    ))
    }
    </div>
    </div>
    </div>
    </>
  )
}
