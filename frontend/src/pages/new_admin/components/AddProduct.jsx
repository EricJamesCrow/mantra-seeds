import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { createProduct } from '../../../redux/slices/productSlice';

// styles
import './AddProduct.css'

// images
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'

// chakra ui
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { Textarea } from '@chakra-ui/react'
import { Select } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'

// upload images
import StyledDropzone from '../../../components/Dropzone';

const PRODUCTS_API_URL = '/api/products/'

export default function AddProduct( { setShowAddProduct }) {
    const [selectedImages, setSelectedImages] = useState([]);


    const toast = useToast()
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch()
    const token = user.token;

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [chakra, setChakra] = useState('')

    const handleClose = () => {
        setShowAddProduct(false);
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
    
      const product = { name, images: selectedImages, description, price: parseInt(price*100), chakra };
    
      const response = await fetch(PRODUCTS_API_URL, {
        method: "POST",
        headers: { 
          "Authorization": token,
          "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      const json = await response.json();
    
      if (!response.ok) {
        toast({
          title: 'Error',
          description: `${json.error}`,
          status: 'error',
          duration: 4000,
          isClosable: true,
        })
      }
      if (response.ok) {
        console.log("new product added");
        dispatch(createProduct(json));
        toast({
          title: 'Product Created.',
          description: `${name} has been added to the database.`,
          status: 'success',
          duration: 10000,
          isClosable: true,
        })
        setName("");
        setDescription("");
        setPrice("");
        setChakra("");
      }
    

    };

  return (
    <div className="add-product-container">
    <div className="admin-container-add-product">
    <div>
        <div>Create Product</div>
        <FontAwesomeIcon 
            icon={faX} 
            style={{
                color: "#000000",
                fontSize: "1.6rem",
                cursor: "pointer"}}
            onClick={handleClose}
            />
        </div>
        <div>
    <span></span>
    </div>
</div>
<form className="add-product-form" onSubmit={handleSubmit}>
  <div className="form-group">
    <label>Product Name</label>
    <Input 
    variant='outline' 
    className="add-product-input"
    onChange={(e) => setName(e.target.value)}
    value={name}
    />
  </div>
  <div className="form-group">
    <label>Description</label>
    <Textarea 
    style={{ marginTop: "0.5rem"}}
    onChange={(e) => setDescription(e.target.value)}
    value={description}
     />
  </div>
  <div className="form-group-two-cols">
    <div>
    <label>Price</label>
    <InputGroup style={{ width: "85%", marginTop: "0.5rem"}}>
    <InputLeftElement
      pointerEvents='none'
      color='gray.300'
      fontSize='1.2em'
      children='$'
    />
    <Input placeholder='Enter amount'
      onChange={(e) => setPrice(e.target.value)}
      value={price} />
    {/* <InputRightElement children={<CheckIcon color='green.500' />} /> */}
  </InputGroup>
  </div>
  <div style={{ marginRight: "1rem"}}>
    <label style={{ paddingBottom: "0.5rem"}}>Chakra</label>
    <Select placeholder="Select" style={{ marginRight: "2rem"}}  onChange={(e) => setChakra(e.target.value)}
      value={chakra}>
        <option value='root'>Root</option>
        <option value='sacral'>Sacral</option>
        <option value='solar'>Solar</option>
        <option value='heart'>Heart</option>
        <option value='throat'>Throat</option>
        <option value='third-eye'>Third Eye</option>
        <option value='crown'>Crown</option>
    </Select>
    </div>
  </div>
  {selectedImages.map((url, index) => (
    <div className="add-product-img-container">
  <img key={index} src={url} alt="Selected" className="add-product-img" />
  <DeleteIcon onClick={() => {
      setSelectedImages(prevSelectedImages => {
        const newSelectedImages = [...prevSelectedImages];
        newSelectedImages.splice(index, 1);
        return newSelectedImages;
      });
    }}
  />
</div>
))}
  <StyledDropzone setSelectedImages={setSelectedImages}/>
  <div className="order-details-button-container create-product">
  <button 
  className="order-details-button delivered">Create Product</button>
</div>
</form>
</div>
  )
}
