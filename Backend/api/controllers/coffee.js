const { query } = require("../../utils/psql_connection");
const createCoffee = async (req, res) => {
  /**
   * Data example
   * {
   *  name: '',
   *  desc: '',
   *  price: '',
   *  size: size_id (1,2,3),
   *  type : id,
   *  qty: #
   * }
   */
  //check if product has been made before,
  let current_product = await query(
    "SELECT * FROM coffee_product WHERE name = $1",
    [req.body.name]
  );
  if (current_product.rows[0] != undefined) {
    console.log("current_product exists!");
  } else {
    current_product = await query(
      `INSERT INTO coffee_product (name, "desc") VALUES ($1,$2) RETURNING ID`,
      [req.body.name, req.body.desc]
    );
    console.log("creating new entry");
  }
  res.json({ message: current_product.rows[0].id });
};

module.exports = { createCoffee };
