const express = require("express");
const app = express();
const server = require("http").createServer(app);
const userRoutes = require("./api/routes/users");
const coffeeRoutes = require("./api/routes/coffee");
/**
 * Middlewares
 */
app.use(express.json());
/**
 * Routes
 */
app.use("/", [userRoutes, coffeeRoutes]);

server.listen(80, () => {
  console.log("Server is hosted on port 80");
});
