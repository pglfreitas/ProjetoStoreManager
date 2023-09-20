const connection = require('./connection');

const findAll = async () => {
const [result] = await connection.execute(
`SELECT sp.sale_id AS saleId,
s.date,
sp.product_id AS productId,
sp.quantity
FROM
sales_products AS sp
INNER JOIN sales AS s On sp.sale_id = s.id`,
);
return result; 
};

const findById = async (id) => {
const [result] = await connection.execute(
`SELECT s.date,
sp.product_id AS productId,
sp.quantity
FROM
sales_products AS sp
INNER JOIN sales AS s On sp.sale_id = s.id
WHERE sale_id = ?`,
[id],
);
return result;
};

const insert = async (sales) => {
const [{ insertId }] = await connection.execute(
'INSERT INTO sales () VALUES ()',
);
let insertPromises = [];
insertPromises = sales.map(({ productId, quantity }) => connection.execute(
'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
[insertId, productId, quantity],
));
await Promise.all(insertPromises);
return {
id: insertId,
itemsSold: sales,
};
};

module.exports = {
findAll,
findById,
insert,
};