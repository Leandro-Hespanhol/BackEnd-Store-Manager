const connection = require('./connection');

const getAll = async () => {
  const query = 'SELECT * FROM products;';
  const [fullSelect] = await connection.execute(query);

  return fullSelect;
};

const insertProduct = async ({ name, quantity }) => {
  const query = 'INSERT INTO products (name, quantity) VALUES (?,?)';
  const [insertedProduct] = await connection.execute(query, [name, quantity]);
  return {
    id: insertedProduct.insertId,
    name,
    quantity,
  };
};

const findById = async (id) => {
  const query = 'SELECT * from products WHERE id = ?;';
  const itemFound = await connection.execute(query, [id]);

  if (!itemFound.length) return null;
  return itemFound;
};

const productEdition = async (id, name, quantity) => {
  const query = 'UPDATE products SET name = ?, quantity = ? WHERE id = ?;';
  const productEdited = await connection.execute(query, [name, quantity, id]);

  if (!productEdited.length) return null;

  return productEdited;
};

const productDeletion = async (id) => {
  const query = 'DELETE from products WHERE id = ?;';
  const productToDelete = await connection.execute(query, [id]);

  if (!productToDelete[0].affectedRows) return null;
  return productToDelete;
};

module.exports = { 
  insertProduct,
  getAll,
  findById,
  productEdition,
  productDeletion,
};