const { saleRegisterResponse, saleEdition, 
  getEverySales, searchSaleById } = require('../services/salesService');

const salesService = require('../services/salesService');

const registerSale = async (req, res) => {
  const requisition = req.body;

  const saleResponse = await saleRegisterResponse(requisition);

  return res.status(201).json(saleResponse);
};

const showSalesById = async (req, res) => {
  const { id } = req.params;
  const idFound = await searchSaleById(id);
  // console.log('linha15salescontroll', idFound);
  
  if (!idFound.length) return res.status(404).json({ message: 'Sale not found' });

  return res.status(200).json(idFound);
};

const editSale = async (req, res) => {
  const { id } = req.params;
  const requisition = req.body;
  const idFound = await searchSaleById(id);

  if (!idFound) return res.status(404).json({ message: 'Sale not found' });

  const saleEdited = await saleEdition(id, requisition);

  res.status(200).json(saleEdited);
};

const getSales = async (_req, res) => res.status(200).json(await getEverySales());

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const isDeleted = await salesService.saleDeletion(id);
  console.log('LINHA 41', isDeleted);

  if (!isDeleted) return res.status(404).json({ message: 'Sale not found' });

  return res.status(204).end();
};

module.exports = {
  registerSale,
  getSales,
  showSalesById,
  editSale,
  deleteSale,
};