const connection = require('./connection');

const getAllSales = async () => {
  const query = `SELECT S.id as saleId, S.date, P.product_id as productId, P.quantity FROM sales S
  JOIN sales_products P ON P.sale_id = S.id;`;
  const [sales] = await connection.execute(query);
  return sales;
};

const findSaleById = async (id) => {
  const query = `SELECT S.date, P.product_id as productId, P.quantity FROM sales S
  JOIN sales_products P ON P.sale_id = S.id 
  WHERE S.id = ?;`;
  const saleFound = await connection.execute(query, [id]);

  if (!saleFound.length) return null;
  
  return saleFound;
};

const saleRegistered = async () => {
  const querySales = 'INSERT INTO sales () VALUES ();';
  const [sale] = await connection.execute(querySales);
  return sale.insertId;
};

const productSaleRegistered = async (saleId, productId, quantity) => {
  const queryProductSales = `INSERT INTO sales_products 
  (sale_id, product_id, quantity) VALUES (?,?,?);`;

  const productSale = await connection.execute(queryProductSales, [saleId, productId, quantity]);
  
  const queryProductsUpdate = 'UPDATE products SET quantity = quantity - ? WHERE id = ?';
  await connection.execute(queryProductsUpdate, [quantity, productId]);

  return productSale;
};

const updateSale = async (saleId, productId, quantity) => {
  const query = `UPDATE sales_products 
    SET product_id = ?,
    quantity = ?
    WHERE sale_id = ?;`;
  const updatedSale = await connection.execute(query, [productId, quantity, Number(saleId)]);

  return updatedSale;
};

const deleteSale = async (id) => {
  const queryQuantity = 'SELECT product_id, quantity from sales_products WHERE sale_id = ?';
  const [saveQuantity] = await connection.execute(queryQuantity, [id]);

  const deletedSale = await connection.execute('DELETE from sales WHERE id = ?', [id]);
  if (!deletedSale[0].affectedRows) return null;

  const queryProductsUpdate = 'UPDATE products SET quantity = quantity + ? WHERE id = ?';
  
  saveQuantity
  .forEach(async (sale) => connection
  .execute(queryProductsUpdate, [sale.quantity, sale.product_id]));

  return deletedSale;
};

module.exports = {
  getAllSales,
  saleRegistered,
  findSaleById,
  productSaleRegistered,
  updateSale,
  deleteSale,
};