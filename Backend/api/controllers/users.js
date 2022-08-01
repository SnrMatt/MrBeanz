const { query } = require("../../utils/psql_connection");
const bcrypt = require("bcrypt");

const createUser = (req, res) => {
  console.log(req.body);
  res.json({ message: "POST new user" });
};

module.exports = {
  createUser,
};
