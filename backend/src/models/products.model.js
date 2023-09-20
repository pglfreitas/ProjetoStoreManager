const connection = require('./connection');

const findAll = async () => {
const [result] = await connection.execute('SELECT * FROM products');
return result; 
};

const findById = async (id) => {
const [[result]] = await connection.execute(
'SELECT * FROM products WHERE id = ?',
[id],
);
return result;
};

const insert = async (name) => {
const [{ insertId }] = await connection.execute(
'INSERT INTO products (name) VALUES (?)',
[name],
);
return insertId;
};

const update = async (id, name) => {
await connection.execute(
'UPDATE products SET name = ? WHERE id = ?',
[name, id],
);
const [[result]] = await connection.execute(
'SELECT * FROM products WHERE id = ?',
[id],
);
return result;
};

module.exports = {
findAll,
findById,
insert,
update,
};