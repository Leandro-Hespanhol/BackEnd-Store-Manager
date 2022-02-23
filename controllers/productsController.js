const { getAll, findById, productEdition,
  productDeletion } = require('../models/productsModel');
const { productsCreate } = require('../services/productsService');

const selectAll = async (_req, res) => res.status(200).json(await getAll());

const selectbyId = async (req, res) => {
  const { id } = req.params;
  const [idFound] = await findById(id);
  
  if (!idFound.length) return res.status(404).json({ message: 'Product not found' });

  return res.status(200).json(idFound[0]);
};

const createProduct = async (req, res, next) => {
  try {
  const { name, quantity } = req.body;
  // const productFound = findProduct(name);
  // console.log('CONTROLLER', await productFound);

  const newProduct = await productsCreate(name, quantity);

  return res.status(201).json(newProduct);
  } catch (e) {
    next(e);
  }
};

const editProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const { id } = req.params;

  const [checkExistance] = await findById(id);
  // console.log('existance', checkExistance);
  if (!checkExistance.length) return res.status(404).json({ message: 'Product not found' });

  await productEdition(id, name, quantity);
  // console.log('CONTROL', checkExistance);

  return res.status(200).json({ id, name, quantity });
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const [productFound] = await findById(id);

  if (await productDeletion(id) === null) {
    return res.status(404).json({ message: 'Product not found' });
  }
  await productDeletion(id);
  
  return res.status(204).json(productFound[0]);
};

module.exports = { createProduct,
  selectAll,
  selectbyId,
  editProduct,
  deleteProduct,
};