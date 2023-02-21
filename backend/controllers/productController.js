const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const Product = require('../models/productModel')
const mongoose = require('mongoose')

// get all products
const getProducts = async (req, res) => {
    const products = await Product.find({}).sort({createdAt: -1})

    res.status(200).json(products)
}

// get a single product
const getProduct = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such product'})
    }

    const product = await Product.findById(id)

    if (!product) {
        return res.status(404).json({error: 'No such product'})
    }

    res.status(200).json(product)
}

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  });

// create new product
const createProduct = async (req, res) => {
    const { name, images, description, price, chakra } = req.body;
  
    let emptyFields = [];
  
    if (!name) {
      emptyFields.push('name');
    }
    if (!images) {
      emptyFields.push('images');
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
  
    // Upload images to S3 bucket
    const uploadedImages = [];
    for (let i = 0; i < images.length; i++) {
      const imageBlob = images[i];
      console.log(imageBlob)
      // convert this blob into something that S3 can accept
      const fileName = `${uuidv4()}.jpg`;
      const imageUrl = await s3.upload({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: fileName,
        Body: Buffer.from(imageBlob, 'base64'),
      })
      uploadedImages.push(imageUrl);
    }
  
    // Add product to database
    try {
      const product = await Product.create({ name, images: uploadedImages, description, price, chakra });
      res.status(200).json(product);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

// delete a product
const deleteProduct = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such product'})
    }
    
    const product = await Product.findOneAndDelete({_id: id})

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
    console.log(product)
    res.status(200).json(product)
}


module.exports = {
    getProducts,
    getProduct,
    createProduct,
    deleteProduct,
    updateProduct
}