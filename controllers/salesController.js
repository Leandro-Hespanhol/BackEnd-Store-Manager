const { getAllSales, findSaleById } = require('../models/salesModel');
const { saleRegisterResponse, saleEdition } = require('../services/salesService');

const registerSale = async (req, res) => {
  const requisition = req.body;
  // console.log('reqbody', requisition);

  const saleResponse = await saleRegisterResponse(requisition);

  // console.log('response', saleResponse);

  return res.status(201).json(saleResponse);
};

const showSalesById = async (req, res) => {
  const { id } = req.params;
  const [idFound] = await findSaleById(id);
  
  if (!idFound.length) return res.status(404).json({ message: 'Sale not found' });

  return res.status(200).json(idFound);
};

const editSale = async (req, res) => {
  const { id } = req.params;
  const requisition = req.body;
  const [idFound] = await findSaleById(id);

  if (!idFound.length) return res.status(404).json({ message: 'Sale not found' });

  // console.log(idFound);
  // console.log(requisition);
  const saleEdited = await saleEdition(id, requisition);
  console.log('saleEdited', saleEdited);

  res.status(200).json(saleEdited);
};

const getSales = async (_req, res) => res.status(200).json(await getAllSales());

module.exports = {
  registerSale,
  getSales,
  showSalesById,
  editSale,
};