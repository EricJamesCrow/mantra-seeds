import React, { useState } from 'react'

// components
import NewProduct from '../../components/NewProduct'
import Pagination from '../../components/Pagination'
import Loading from '../../components/loading/loading'

// styles
import './Shop.css'

// images
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

// filters
import ShowAll from '../../images/chakras/show-all.svg'
import Root from '../../images/chakras/root-chakra.svg'
import Sacral from '../../images/chakras/sacral-chakra.svg'
import Solar from '../../images/chakras/solar-chakra.svg'
import Heart from '../../images/chakras/heart-chakra.svg'
import Throat from '../../images/chakras/throat-chakra.svg'
import ThirdEye from '../../images/chakras/third-eye-chakra.svg'
import Crown from '../../images/chakras/crown-chakra.svg'

//redux
import { useSelector } from 'react-redux'

// chakra ui
import { Select } from '@chakra-ui/react'


export default function Shop() {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1); // pagination
    const [itemsPerPage, setItemsPerPage] = useState(12); // pagination
    const products = useSelector(state => state.products.products);
    const reviews = useSelector(state => state.reviews.reviews);
    if (!products || !reviews) return <Loading/>; // only render once redux is loaded
  
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

    const handleChakraClick = (chakraName) => {
      if(chakraName === "Show All") {
        return setSearchTerm('')
      }
      setSearchTerm(chakraName.toLowerCase());
      setCurrentPage(1);
    };
  

  return (
    <div className="shop-container">
        <h1>Shop Products</h1>
        <div className="search-and-filters-container">
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
            id="searchProducts" 
            placeholder='Search Products'
            className="filter-sort-search-input"
            onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </form>
            <div className="shop-chakra-filters">
              {[    { name: "Show All", image: ShowAll },    { name: "Root", image: Root },    { name: "Sacral", image: Sacral },    { name: "Solar", image: Solar },    { name: "Heart", image: Heart },    { name: "Throat", image: Throat },    { name: "Third Eye", image: ThirdEye },    { name: "Crown", image: Crown },  ].map((filter, index) => (
                <div key={index} className='chakra-filter' onClick={() => handleChakraClick(filter.name)}>
                  <img src={filter.image} alt={filter.name} />
                  <span>{filter.name}</span>
                </div>
              ))}
            </div>
        </div>
    <div className="admin-page-results-container">
  <div>{results === 0 ? `0 - ${results} of ${results} Results` :
      `${(currentPage - 1) * itemsPerPage + 1} - ${Math.min(currentPage * itemsPerPage, results)} of ${results} Results`}</div>
  <div>
    <div>Results per Page:</div>
    <Select size='xs' onChange={handleSelect}>
      <option value='12'>12</option>
      <option value='24'>24</option>
      <option value='36'>36</option>
      <option value='48'>48</option>
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
