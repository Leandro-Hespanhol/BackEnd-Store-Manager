const { getAllSales, findSaleById } = require('../models/salesModel');
const { saleRegisterResponse } = require('../services/salesService');

const registerSale = async (req, res) => {
  const requisition = [...req.body];
  console.log('reqbody', requisition);

  // const saleResponse = await saleRegisterResponse(productId, quantity);
  const response = [];
  await requisition.forEach((elem) => [response.push(saleRegisterResponse(elem))]);
  // const saleResponse = await saleRegisterResponse(...requisition);

  console.log('response', response);

  res.status(201).json(response);
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