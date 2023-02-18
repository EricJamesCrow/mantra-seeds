import React, { useState } from 'react'

// components
import AdminHeader from '../components/AdminHeader'
import FilterSort from '../components/FilterSort'
import SideBar from '../components/SideBar'
import ProductCard from '../components/ProductCard'
import AddProduct from '../components/AddProduct'

import Pagination from '../../../components/Pagination'

//redux
import { useSelector } from 'react-redux'

export default function AdminProducts() {
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const products = useSelector(state => state.products.products);
  if (!products) return null; // only render once redux is loaded

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const productsData = filteredProducts
    .slice(indexOfFirstItem, indexOfLastItem)
    .map(product => ({
      id: 'product',
      cardId: product._id,
      dateCreated: product.createdAt,
      var1: product.name,
      var2: 'active',
      var3: product.price,
      var4: '5',
      var5: 'In Stock',
    }));

  return (
    <>
    <div className='admin-side-bar-main-content-container'>
    <SideBar/>
    <div className="admin-main-content">
    <AdminHeader setShowAddProduct={setShowAddProduct}/>
    <FilterSort results={filteredProducts.length} setSearchTerm={setSearchTerm} setItemsPerPage={setItemsPerPage}/>
    <div className="display-admin-orders">
    {productsData.map(item => (
      <ProductCard 
      key={item.id}
      item={item}
      />
    ))
    }
    </div>
    <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={filteredProducts.length}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
    </div>
    </div>
    {showAddProduct &&
    <div style={{ position: 'fixed', top: '61px', left: 0, right: 0, zIndex: 1 }}>
    <AddProduct setShowAddProduct={setShowAddProduct}/>
    </div>}
    </>
  )
}