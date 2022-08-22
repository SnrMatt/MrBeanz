const pg = require("pg");
require("dotenv").config;
const client = new pg.Pool({
  host: process.env.dbhostname,
  port: process.env.dbport,
  user: process.env.dbuser,
  database: process.env.dbname,
  password: process.env.dbpassword,
  max: 20,
  ssl: false,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

module.exports = {
  query: (text, params) => client.query(text, params),
};
