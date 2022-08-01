const e = require("express");
const { query } = require("../../utils/psql_connection");
const createCoffee = (req, res) => {
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
  //Create products
  query(
    'INSERT INTO coffee_product (name, "desc", price) VALUES($1,$2,$3)',
    [req.body.name, req.body.desc, req.body.price],
    (err, result) => {
      if (err) {
        throw new Error(err);
      } else {
      }
    }
  );
  setTimeout(() => {
    query(`SELECT * FROM coffee_product`, null, (err, result) => {
      console.log(result);
      res.json({ message: "Coffee created!" });
    });
  }, 2000);
};

module.exports = { createCoffee };
