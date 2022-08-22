const { query } = require("../../utils/psql_connection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const createUser = async (req, res) => {
  /**
   * first
   * last
   * Email
   * password
   * telephone
   */
  //let check if email and phone number has not been used

  let userExists = await (async () => {
    let result = await query(
      "SELECT email,telephone FROM users WHERE email =$1 OR telephone = $2 ",
      [req.body.email, req.body.telephone]
    );
    if (result.rows[0] === undefined) {
      return false;
    } else return true;
  })();

  if (!userExists) {
    console.log(typeof process.env.SALT_ROUNDS);
    let hash = await bcrypt.hash(
      req.body.password,
      parseInt(process.env.SALT_ROUNDS)
    );

    await query(
      "INSERT INTO users (first_name, last_name, email, password, telephone) VALUES ($1,$2,$3,$4,$5)",
      [
        req.body.first_name,
        req.body.last_name,
        req.body.email,
        hash,
        req.body.telephone,
      ]
    );

    res.send({ message: "Created a new user!" });
  } else {
    res.send({
      message: `${req.body.email} and ${req.body.telephone} already have an account! Please try a different email and number.`,
    });
  }
};

const loginUser = async (req, res) => {
  let user = await query(
    "SELECT id , email, password FROM users WHERE email = $1",
    [req.body.email]
  );

  if (!user.rows[0]) {
    res.send({ message: "Email is not valid." });
    return;
  }

  user = user.rows[0];
  let isUserCredentials = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (isUserCredentials === true) {
    //Generate JWT TOKEN
    let token = jwt.sign(
      { context: { userID: user.id, role: ["user"], email: user.email } },
      process.env.SECRET_KEY,
      { expiresIn: "2h" }
    );
    res.json({ access_token: token });
  } else {
    res.send({ message: "Passowrd is invalid!" });
  }
};

const updateUserAddress = async (req, res) => {
  //Check if user already had address
  let addressExists = await query(
    "SELECT user_id FROM user_address WHERE user_id = $1",
    [req.body.user.context.userID]
  );

  if (addressExists.rows[0] !== undefined) {
    //update address
    await query(
      `
    UPDATE user_address 
    SET
      address_line = $1,
      city = $2,
      country = $3,
      state = $4,
      zipcode = $5
      WHERE user_id = $6 
    `,
      [
        req.body.address_line,
        req.body.city,
        req.body.country,
        req.body.state,
        req.body.zipcode,
        req.body.user.context.userID,
      ]
    );
    res.send({ message: "User address updated" });
    return;
  }
  //create new address entry
  await query(
    `INSERT INTO 
  user_address (user_id, address_line, city, country, state,zipcode)
  VALUES ($1,$2,$3,$4,$5, $6) 
  `,
    [
      req.body.user.context.userID,
      req.body.address_line,
      req.body.city,
      req.body.country,
      req.body.state,
      req.body.zipcode,
    ]
  );
  res.send({ message: "User address updated" });
};

module.exports = {
  createUser,
  loginUser,
  updateUserAddress,
};
