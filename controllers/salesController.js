const { getAllSales, findSaleById } = require('../models/salesModel');
const { saleRegisterResponse } = require('../services/salesService');

const registerSale = async (req, res) => {
  const { productId, quantity } = req.body;

  const saleResponse = await saleRegisterResponse(productId, quantity);

  res.status(200).json(saleResponse);
};

const showSalesById = async (req, res) => {
  const { id } = req.params;
  const [idFound] = await findSaleById(id);
  
  if (!idFound.length) return res.status(404).json({ message: 'Sale not found' });

  return res.status(200).json(idFound);
};

const getSales = async (_req, res) => res.status(200).json(await getAllSales());

module.exports = {
  registerSale,
  getSales,
  showSalesById,
};