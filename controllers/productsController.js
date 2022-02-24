const { getAllProducts, productsCreate,
   getById, productToEdit, deletingProduct } = require('../services/productsService');

const selectAll = async (_req, res) => res.status(200).json(await getAllProducts());

const selectbyId = async (req, res) => {
  const { id } = req.params;
  const getIdItem = await getById(id);
  
  if (!getIdItem) return res.status(404).json({ message: 'Product not found' });

  return res.status(200).json(getIdItem);
};

const createProduct = async (req, res, next) => {
  try {
  const { name, quantity } = req.body;

  const newProduct = await productsCreate(name, quantity);

  return res.status(201).json(newProduct);
  } catch (e) {
    next(e);
  }
};

const editProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const { id } = req.params;

  const checkExistance = await getById(id);

  if (!checkExistance) return res.status(404).json({ message: 'Product not found' });

  await productToEdit(id, name, quantity);

  return res.status(200).json({ id, name, quantity });
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const productFound = await getById(id);
  console.log('productFound', productFound);

  if (await deletingProduct(id) === null) {
    return res.status(404).json({ message: 'Product not found' });
  }
  await deletingProduct(id);
  
  return res.status(204).json(productFound);
};

module.exports = { createProduct,
  selectAll,
  selectbyId,
  editProduct,
  deleteProduct,
};