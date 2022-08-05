const Router = require("express-promise-router");
const router = new Router();
const coffeeController = require("../controllers/coffee");

router.get("/api/coffee", coffeeController.getAllCoffee);
router.post("/api/coffee", coffeeController.createCoffee);
router.delete("/api/coffee", coffeeController.deleteAllCoffee);
router.get("/api/coffee/:name", coffeeController.getCoffee);
router.delete("/api/coffee/:id");
module.exports = router;
