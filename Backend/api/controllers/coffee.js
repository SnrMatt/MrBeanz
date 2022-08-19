const e = require("express");
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
  if (current_product.rows[0] === undefined) {
    current_product = await query(
      `INSERT INTO coffee_product (name, "desc") VALUES ($1,$2) RETURNING ID`,
      [req.body.name, req.body.desc]
    );
    console.log("creating new entry");
  }

  let sizeResults = await query(
    "SELECT size_id FROM coffee_attributes WHERE coffee_id = $1",
    [current_product.rows[0].id]
  );

  let sizeExists;
  for (var i = 0; i < sizeResults.rows.length; i++) {
    if (sizeResults.rows[i].size_id === req.body.size.toString()) {
      sizeExists = true;
    } else sizeExists = false;
  }
  if (!sizeExists) {
    await query(
      "INSERT INTO coffee_attributes (coffee_id, size_id, type_id, qty,price) VALUES ($1,$2,$3,$4,$5)",
      [
        current_product.rows[0].id,
        req.body.size,
        req.body.type,
        req.body.qty,
        req.body.price,
      ]
    );
    res.json({ message: "Created coffee successfully!" });
  } else {
    res.json({ message: "There is already a size for this item!" });
  }
};

const getAllCoffee = async (req, res) => {
  let coffee_list = await query(
    `SELECT 
      id AS product_id,
      coffee_product.name,
      coffee_product.desc AS description
     FROM coffee_product
    `
  );

  res.json(coffee_list.rows);
};
const getCoffee = async (req, res) => {
  let { name } = req.params;
  let results = await query(
    `SELECT
      coffee_product.id product_id,
      coffee_sizes.size_name size,
      coffee_types.name type,
      price,
      qty
      FROM coffee_product
      INNER JOIN coffee_attributes ON coffee_product.id = coffee_attributes.coffee_id
      INNER JOIN coffee_sizes ON coffee_attributes.size_id = coffee_sizes.id
      INNER JOIN coffee_types ON coffee_attributes.type_id = coffee_types.id
      WHERE coffee_product.name = $1
    `,
    [name]
  );
  res.send(results.rows);
};

const deleteAllCoffee = async (req, res) => {
  await query("DELETE FROM coffee_attributes WHERE coffee_id > 0");
  await query("DELETE FROM coffee_product WHERE id > 0");
  await query("ALTER SEQUENCE coffee_product_id_seq RESTART WITH 1");
  res.json({ message: "All coffee products have been REMOVED!" });
};

const deleteCoffee = async (req, res) => {
  let { id } = req.params;
  let coffee_name = await query(
    "SELECT name FROM coffee_product WHERE id = $1",
    [id]
  );
  await query("DELETE FROM coffee_attributes WHERE coffee_id = $1", [id]);
  await query("DELETE FROM coffee_product where id = $1", [id]);
  res.json({
    message: `${coffee_name.rows[0].name} has been removed from the database.`,
  });
};
module.exports = {
  createCoffee,
  getAllCoffee,
  getCoffee,
  deleteAllCoffee,
  deleteCoffee,
};
