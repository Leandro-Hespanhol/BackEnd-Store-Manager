const connection = require('./connection');

const getAll = async () => {
  const query = 'SELECT * FROM products;';
  const [fullSelect] = await connection.execute(query);
  // console.log(await fullSelect);

  return fullSelect;
};

const insertProduct = async ({ name, quantity }) => {
  const query = 'INSERT INTO products (name, quantity) VALUES (?,?)';
  const [insertedProduct] = await connection.execute(query, [name, quantity]);
  // console.log(insertedProduct);
  return {
    id: insertedProduct.insertId,
    name,
    quantity,
  };
};

const findProduct = async (name) => {
  const query = 'SELECT * from products WHERE name = ?';
  const [productFound] = await connection.execute(query, [name]);
  // console.log('name', name);
  // console.log('produto', productFound);

  return productFound.length;
};

const findById = async (id) => {
  const query = 'SELECT * from products WHERE id = ?;';
  const itemFound = await connection.execute(query, [id]);

  if (!itemFound.length) return null;
  
  return itemFound;
};

const productEdition = async (id, name, quantity) => {
  // console.log('model', id, name, quantity);
  const query = 'UPDATE products SET name = ?, quantity = ? WHERE id = ?;';
  const productEdited = await connection.execute(query, [name, quantity, id]);
  // console.log('productEdited', productEdited);

  if (!productEdited.length) return null;

  return productEdited;
};

const productDeletion = async (id) => {
  const query = 'DELETE from products WHERE id = ?;';
  const productToDelete = await connection.execute(query, [id]);
  // console.log(productToDelete[0].affectedRows);

  if (!productToDelete[0].affectedRows) return null;

  return productToDelete;
};

module.exports = { 
  insertProduct,
  findProduct,
  getAll,
  findById,
  productEdition,
  productDeletion,
};