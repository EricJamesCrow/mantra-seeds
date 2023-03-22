import React, { useState, useEffect } from 'react'

// components
import AdminHeader from '../components/AdminHeader'
import FilterSort from '../components/FilterSort'
import SideBar from '../components/SideBar'
import ProductCard from '../components/ProductCard'
import AddProduct from '../components/AddProduct'
import Pagination from '../../../components/Pagination'

//redux
import { useSelector } from 'react-redux'

// styles
import './AdminProducts.css'

export default function AdminProducts() {
  const [showAddProduct, setShowAddProduct] = useState(false);

  useEffect(() => {
    // Disable scrollbar when AddProduct is visible
    const overlay = document.querySelector('.admin-products-overlay');
    overlay.classList.toggle('show', showAddProduct);
    if (showAddProduct) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    // Cleanup the effect
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showAddProduct]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1); // pagination
  const [itemsPerPage, setItemsPerPage] = useState(10); // pagination
  const products = useSelector(state => state.products.products);
  if (!products) return null; // only render once redux is loaded

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage; // pagination
  const indexOfFirstItem = indexOfLastItem - itemsPerPage; // pagination
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
      image: product.image,
    }));

  return (
    <>
    <div className='admin-side-bar-main-content-container'>
    <SideBar/>
    <div className="admin-main-content">
    <AdminHeader setShowAddProduct={setShowAddProduct}/>
    <FilterSort results={filteredProducts.length} setSearchTerm={setSearchTerm} currentPage={currentPage} itemsPerPage={itemsPerPage} setItemsPerPage={setItemsPerPage}/>
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
    <div className="admin-products-add-product-container">
    <AddProduct setShowAddProduct={setShowAddProduct}/>
    </div>}
    </>
  )
}