import React from 'react'

// components
import AdminHeader from '../components/AdminHeader'
import FilterSort from '../components/FilterSort'
import SideBar from '../components/SideBar'
import ProductCard from '../components/ProductCard'

//redux
import { useSelector } from 'react-redux'

export default function AdminProducts() {
  const products = useSelector(state => state.products.products);
  if (!products) return null; // only render once redux is loaded

  const productsData = products.map(product => ({
    id: "product",
    cardId: product._id,
    dateCreated: product.createdAt,
    var1: product.name,
    var2: "active",
    var3: product.price,
    var4: "5",
    var5: "In Stock"
  }));

  return (
    <>
    <div className='admin-side-bar-main-content-container'>
    <SideBar/>
    <div className="admin-main-content">
    <AdminHeader/>
    <FilterSort results={productsData.length}/>
    <div className="display-admin-orders">
    {productsData.map(item => (
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
