const pg = require("pg");
const client = new pg.Pool({
  host: "45.77.164.242",
  port: 5432,
  user: "axios",
  database: "mrbeanz",
  password: "Matt2144!",
  max: 20,
  ssl: false,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

module.exports = {
  query: function (text, values, cb) {
    client.connect((err, client, done) => {
      client.query(text, values, (err, res) => {
        done();
        cb(err, res);
      });
    });
  },
};
