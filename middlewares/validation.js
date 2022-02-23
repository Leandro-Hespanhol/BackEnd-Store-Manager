const { findProduct } = require('../models/productsModel');

const nameValidation = async (req, res, next) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: '"name" is required' });
  if (name.length < 5) {
    return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
   }

  next();
};

const repeatedProduct = async (req, res, next) => {
  const { name } = req.body;
  if (await findProduct(name) > 0) {
    return res.status(409).json({ message: 'Product already exists' });
  }
  next();
};

const quantityValidation = async (req, res, next) => {
  const { quantity } = req.body;
  if (!quantity && quantity !== 0) {
    return res.status(400).json({ message: '"quantity" is required' });
  }
  if (quantity <= 0 || typeof quantity !== 'number') {
    return res.status(422)
      .json({ message: '"quantity" must be a number larger than or equal to 1' });
  }
  next();
};

const productIdValidation = async (req, res, next) => {
  const { product_id: productId } = req.body;
  if (!productId) {
    return res.status(400).json({ message: '"product_id" is required' });
  }
  // console.log('req.body.product_id', req.body.product_id);
  next();
};

module.exports = {
 nameValidation,
 quantityValidation,
 productIdValidation,
 repeatedProduct,
};
