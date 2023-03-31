const Product = require('../models/productModel')

const checkInventory = async (req, res) => {
    try {
      const { items } = req.body;
  
      for (const item of items) {
        const product = await Product.findById(item.product);
        if (!product || product.quantity < item.quantity) {
          return res.status(400).json({
              error: `Insufficient quantity for product: ${item.name}`,
          });
        }
      }
  
      res.status(200).send({ success: "Inventory check passed" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error: "Inventory check failed"
      });
    }
  };

  
module.exports = {
    checkInventory,
}