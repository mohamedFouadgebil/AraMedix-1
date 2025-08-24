const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const auth = require('../middleware/auth');
const upload = require('../middleware/uploadProduct'); 

router.get('/', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

router.post('/', auth(['admin']), upload.single('image'), async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const imagePath = req.file ? `/uploads/products/${req.file.filename}` : '';

    const product = new Product({
      name,
      price,
      description,
      image: imagePath
    });

    await product.save();
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
