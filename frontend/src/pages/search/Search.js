import React, {useState} from 'react'
import { useParams } from 'react-router-dom'

// components
import NewProduct from '../../components/NewProduct'
import Pagination from '../../components/Pagination'

// chakra ui
import { Select } from '@chakra-ui/react'

//redux
import { useSelector } from 'react-redux'

// styles
import './Search.css'

// react helmet
import { Helmet } from 'react-helmet-async';

export default function Search() {
    const { id } = useParams();
    const [currentPage, setCurrentPage] = useState(1); // pagination
    const [itemsPerPage, setItemsPerPage] = useState(10); // pagination
    const products = useSelector(state => state.products.products);
    const reviews = useSelector(state => state.reviews.reviews)
    if (!products || !reviews) return null; // only render once redux is loaded
    let searchTerm = id;

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.chakra.toLowerCase().includes(searchTerm.toLowerCase())
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
    <div className="search-page-container">
        <Helmet>
          <title>Search {searchTerm} | Mantra Seeds</title>
          <meta
            name="description"
            content={`Search results for ${searchTerm}`}
          />        
        </Helmet>
        <h1>Search Results</h1>
        <h2>{`We found ${results} results for ${searchTerm}`}</h2>
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
<div className="shop-display-products-container">
{productsData.map(product => (
    <NewProduct
    key={product._id}
    product={product}
    reviews={reviews}
    />
))
}
</div>
<div className="pagination-container">
    <Pagination
                itemsPerPage={itemsPerPage}
                totalItems={filteredProducts.length}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
          </div>
    </div>
  )
}
