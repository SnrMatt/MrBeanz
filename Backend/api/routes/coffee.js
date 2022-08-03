const Router = require("express-promise-router");
const router = new Router();
const cofeeController = require("../controllers/coffee");

router.post("/api/coffee", cofeeController.createCoffee);

module.exports = router;
