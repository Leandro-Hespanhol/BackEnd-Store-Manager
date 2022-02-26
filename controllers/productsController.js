const productsService = require('../services/productsService');

const selectAll = async (_req, res) => res.status(200).json(await productsService.getAllProducts());

const selectbyId = async (req, res) => {
  const { id } = req.params;
  const getIdItem = await productsService.getById(id);
  
  if (!getIdItem) return res.status(404).json({ message: 'Product not found' });

  return res.status(200).json(getIdItem);
};

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;

  const allProducts = await productsService.getAllProducts();

  if (allProducts.some((product) => product.name === name)) {
    return res.status(409).json({ message: 'Product already exists' });
  }

  const newProduct = await productsService.productsCreate(name, quantity);

  return res.status(201).json(newProduct);
};

const editProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const { id } = req.params;

  const checkExistance = await productsService.getById(id);

  if (!checkExistance) return res.status(404).json({ message: 'Product not found' });

  await productsService.productToEdit(id, name, quantity);

  return res.status(200).json({ id, name, quantity });
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const productFound = await productsService.getById(id);

  if (await productsService.deletingProduct(id) === null) {
    return res.status(404).json({ message: 'Product not found' });
  }
  await productsService.deletingProduct(id);
  
  return res.status(204).json(productFound);
};

module.exports = { createProduct,
  selectAll,
  selectbyId,
  editProduct,
  deleteProduct,
};