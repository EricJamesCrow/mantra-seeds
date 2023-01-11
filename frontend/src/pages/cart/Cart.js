import React, { useState, useEffect } from 'react'
import { useParams, useNavigate} from 'react-router-dom'
import { useProductsContext } from "../../hooks/useProductsContext";
import { useAuthContext } from '../../hooks/useAuthContext';

// styles
import "./Cart.css"

// images
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import Cannabis from "../../images/cannabis-leaf-green.svg"
import Crown from "../../images/chakras/crown-chakra.svg"

export default function Cart() {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [chakra, setChakra] = useState('')
    const [strain, setStrain] = useState('')
    const [thc, setThc] = useState('')

    const { id } = useParams()
    const [product, setProduct] = useState('')
    const { dispatch } = useProductsContext()
    
    const [productAttributes, setProductAttributes] = useState({
      "Price": product.price,
      "Strain": product.strain,
      "THC": product.thc
    })

    const navigate = useNavigate();

    const { user } = useAuthContext() // JWT token in local storage

    useEffect(() => {
        const url = '/api/products/'+id;
        fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setProduct(data)
            })
    }, [id])

    useEffect(() => {
      setProductAttributes({"Price": product.price, "Strain": product.strain, "THC": product.thc})
      setName(product.name)
      setDescription(product.description)
      setPrice(product.price)
      setChakra(product.chakra)
      setStrain(product.strain)
      setThc(product.thc)
    }, [product])
      
  return (
    <>
    <div style={{ marginTop: '50px', zIndex: 1 }}>
    <div className="add-product">
    <div>SHOPPING CART</div>
    <FontAwesomeIcon
          icon={faCartShopping} 
          style={{
            color: "#000000",
            fontSize: "1.6rem",
            float: "right",
            marginRight: "10px"
          }}
        />
    </div>
    <div>

    </div>
    <div className="edit-product-fields">
    <div className="save-changes"> 
        <button>CHECKOUT</button>
    </div>
    </div>
    </div>
    </>
  )
}
