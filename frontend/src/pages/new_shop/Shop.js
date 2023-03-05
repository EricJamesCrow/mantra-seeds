import React, { useState } from 'react'

// components
import NewProduct from '../../components/NewProduct'
import Pagination from '../../components/Pagination'

// styles
import './Shop.css'

// images
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

//redux
import { useSelector } from 'react-redux'

// chakra ui
import { Select } from '@chakra-ui/react'

export default function Shop() {
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
      .slice(indexOfFirstItem, indexOfLastItem);

    let results = filteredProducts.length

    const handleSelect = (e) => {
        setItemsPerPage(e.target.value)
      }
  

  return (
    <div className="shop-container">
        <div>Shop Products</div>
        <form>
    <div className="filter-sort-search-container">
    <FontAwesomeIcon 
      icon={faSearch} 
      style={{
          color: "#36454F",
          fontSize: "1.3rem"
        }}
      />
    <input type="text" 
    id="searchInput" 
    placeholder={`Search Products`} 
    class="filter-sort-search-input"
    onChange={(e) => setSearchTerm(e.target.value)}
    />
    </div>
    </form>
    <div className="admin-page-results-container">
  <div>{results === 0 ? `0 - ${results} of ${results} Results` :
      `${(currentPage - 1) * itemsPerPage + 1} - ${Math.min(currentPage * itemsPerPage, results)} of ${results} Results`}</div>
  <div>
    <div>Results per Page:</div>
    <Select size='xs' onChange={handleSelect}>
      <option value='10'>10</option>
      <option value='20'>20</option>
      <option value='30'>30</option>
      <option value='40'>40</option>
    </Select>
  </div>
</div>
{productsData.map(product => (
    <NewProduct
    key={product._id}
    product={product}
    />
))

}
<Pagination
            itemsPerPage={itemsPerPage}
            totalItems={filteredProducts.length}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
    </div>
  )
}
