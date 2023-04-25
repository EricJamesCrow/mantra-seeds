import React, { useRef } from 'react'

// chakra ui
import { Input } from '@chakra-ui/react'
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

// styles 
import './Pagination.css'

export default function Pagination ({ itemsPerPage, totalItems, currentPage, setCurrentPage }) {
    const inputRef = useRef(null);
    const pageNumbers = [];
  
    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
      pageNumbers.push(i);
    }
    
    const handleLeft = () => {
        if(currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
        inputRef.current.value = '';
    }

    const handleRight = () => {
        if(currentPage < pageNumbers.length) {
            setCurrentPage(currentPage + 1)
        }
        inputRef.current.value = '';
    }

    const handleInput = (e) => {
        const inputValue = parseInt(e.target.value, 10);
        if (inputValue > 0 && inputValue <= pageNumbers.length) {
          setCurrentPage(inputValue);
          inputRef.current.value = ''; // Clear the input value
        }
      };

    const validateInput = (e) => {
    const inputValue = e.target.value;
    const isValid = inputValue >= 1 && inputValue <= pageNumbers.length;
    if (!isValid) {
        e.target.value = inputValue.slice(0, -1); // Remove the last character if it's not valid
    }
    };
      
  
    return (
      <nav>
        <div className="pagination">
            <ChevronLeftIcon w={8} h={8} onClick={handleLeft} color={currentPage === 1 ? "rgba(0, 0, 0, 0.36)" : null}/>
            <Input ref={inputRef} placeholder={currentPage} onInput={handleInput} onChange={validateInput} size='xs' style={{ background: 'white', width: '25px', fontFamily: 'Roboto', fontWeight: '500'}} fontSize="14px"/>
            <div>out of <span>{pageNumbers.length}</span></div>
            <ChevronRightIcon w={8} h={8} onClick={handleRight} color={currentPage === pageNumbers.length ? "rgba(0, 0, 0, 0.36)" : null}/>
        </div>
      </nav>
    );
  };
  
