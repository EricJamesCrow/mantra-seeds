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
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState(null);
  const [filter, setFilter] = useState(null);


  const handleSort = (field, direction) => {
    setSortField(field);
    setSortDirection(direction);
  };
  
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

  const isProductMatchingFilter = (product) => {
    if (!filter) {
      return true;
    }
  
    switch (filter) {
      case 'inStock':
        return product.quantity > 0;
      case 'outOfStock':
        return product.quantity <= 0;
      default:
        return true;
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) && isProductMatchingFilter(product)
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (!sortField) return 0;
    const aValue = a[sortField];
    const bValue = b[sortField];
    if (typeof aValue === "string") {
      if (sortDirection === "asc") {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    } else {
      if (sortDirection === "asc") {
        return aValue - bValue;
      } else {
        return bValue - aValue;
      }
    }
  });

  const indexOfLastItem = currentPage * itemsPerPage; // pagination
  const indexOfFirstItem = indexOfLastItem - itemsPerPage; // pagination
  const productsData = sortedProducts
    .slice(indexOfFirstItem, indexOfLastItem)
    .map(product => {
      const inStock = product.quantity > 0;
      return {
        id: 'product',
        cardId: product._id,
        dateCreated: product.createdAt,
        var1: product.name,
        var2: inStock ? 'active' : 'inactive',
        var3: product.price,
        var4: product.quantity,
        var5: inStock ? 'In Stock' : 'Out of Stock',
        image: product.image,
      };
    });

  return (
    <>
    <div className='admin-side-bar-main-content-container'>
    <SideBar/>
    <div className="admin-main-content">
    <AdminHeader setShowAddProduct={setShowAddProduct}/>
    <FilterSort results={filteredProducts.length} setSearchTerm={setSearchTerm} currentPage={currentPage} itemsPerPage={itemsPerPage} setItemsPerPage={setItemsPerPage} onSort={handleSort} setFilter={setFilter} filter={filter}/>
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