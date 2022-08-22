const jwt = require("jsonwebtoken");
require("dotenv").config();
const { query } = require("../../utils/psql_connection");

const userAuthToken = (req, res, next) => {
  let token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
    if (decoded === undefined) {
      res.send({ message: "Invalid Token" });
      return;
    }

    //Check if user exist in DB and verify that it has a role
    let user = await query("SELECT email FROM users WHERE id = $1", [
      decoded.context.userID,
    ]);
    if (
      user.rows[0].email === decoded.context.email &&
      decoded.context.role[0] === "user"
    ) {
      req.body.user = decoded;
      next();
      return;
    }
    res.send({ message: "Invalid payload with token" });
  });
};

module.exports = {
  userAuthToken,
};
