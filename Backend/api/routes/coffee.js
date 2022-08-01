const express = require("express");
const router = express.Router();
const cofeeController = require("../controllers/coffee");

router.post("/api/coffee", cofeeController.createCoffee);

module.exports = router;
