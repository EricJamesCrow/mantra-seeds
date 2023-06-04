const Product = require('../models/productModel')
const mongoose = require('mongoose')

// aws
const { uploadImage } = require('../helpers/s3-helper');

// sharp
const { resizeImage } = require('../helpers/sharp-helper');


// get all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({deleted: {$ne: true}}).sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while retrieving the products." });
  }
}

// get a single product
const getProduct = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such product'})
    }

    const product = await Product.findOne({ _id: id, deleted: {$ne: true} });

    if (!product) {
        return res.status(404).json({error: 'No such product'})
    }

    res.status(200).json(product)
}

// create new product
const createProduct = async (req, res) => {
    try {
      const { name, quantity, description, price, chakra} = req.body;
      // Check for any errors with the file upload
      if (req.fileValidationError) {
        console.log(req.fileValidationError)
        console.log("error")
        return res.status(400).json({ message: req.fileValidationError });
      } else if (!req.file) {
        console.log('No files were uploaded.')
        return res.status(400).json({ message: 'No files were uploaded.' });
      }

      const image = req.file;
    
      let emptyFields = [];
    
      if (!name) {
        emptyFields.push('name');
      }
      if (!quantity) {
        emptyFields.push('quantity');
      }
      if (!image) {
        emptyFields.push('image');
      }
      if (!price) {
        emptyFields.push('price');
      }
      if (!chakra) {
        emptyFields.push('chakra');
      }
      if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields });
      }

      // Resize image
      const resizedImage = await resizeImage(image);
    
      const imageLocation = await uploadImage(resizedImage);
    
      // Add product to database
      const product = await Product.create({ name, quantity, image: imageLocation, description, price, chakra });
      res.status(200).json(product);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }

  };

// delete a product
const deleteProduct = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such product'})
    }
    
    const product = await Product.findByIdAndUpdate(id, { deleted: true }, {new: true})

    if (!product) {
        return res.status(400).json({error: 'No such product'})
    }

    res.status(200).json(product)

}

// update a product
const updateProduct = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such product'})
    }

    const product = await Product.findOneAndUpdate({_id: id}, {
        ...req.body
    }, {new: true})

    if (!product) {
        return res.status(400).json({error: 'No such product'})
    }
    res.status(200).json(product)
}


module.exports = {
    getProducts,
    getProduct,
    createProduct,
    deleteProduct,
    updateProduct
}