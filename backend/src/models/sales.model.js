const connection = require('./connection');

const findAll = async () => {
	const [result] = await connection.execute(
		`SELECT sp.sale_id AS saleId,
		s.date,
		sp.product_id AS productId,
		sp.quantity
		FROM
		sales_products AS sp
		INNER JOIN sales AS s On sp.sale_id = s.id`
	)
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

module.exports = {
	findAll,
	findById,
  };