import React from 'react'

// chakra ui
import { Input } from '@chakra-ui/react'
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

// styles 
import './Pagination.css'

export default function Pagination ({ itemsPerPage, totalItems, currentPage, setCurrentPage }) {
    const pageNumbers = [];
  
    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
      pageNumbers.push(i);
    }
    
    const handleLeft = () => {
        if(currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    const handleRight = () => {
        if(currentPage < pageNumbers.length) {
            setCurrentPage(currentPage + 1)
        }
    }

    const handleInput = (e) => {
        if(e.target.value > 0 && e.target.value <= pageNumbers.length) {
            setCurrentPage(e.target.value)
        }
    }
  
    return (
      <nav>
        <div className="pagination">
            <ChevronLeftIcon w={8} h={8} onClick={handleLeft} color={currentPage === 1 ? "rgba(0, 0, 0, 0.36)" : null}/>
            <Input placeholder={currentPage} onInput={handleInput} size='xs' style={{ background: 'white', width: '25px', fontFamily: 'Roboto', fontWeight: '500'}} fontSize="14px"/>
            <div>out of <span>{pageNumbers.length}</span></div>
            <ChevronRightIcon w={8} h={8} onClick={handleRight} color={currentPage === pageNumbers.length ? "rgba(0, 0, 0, 0.36)" : null}/>
        </div>
      </nav>
    );
  };
  
