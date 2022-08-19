const express = require("express");
const router = express.Router();
const userController = require("../controllers/users");
const { userAuthToken } = require("../middleware/user_token_auth");

router.post("/api/register", userController.createUser);
router.post("/api/login", userController.loginUser);
router.post(
  "/api/user/update-address",
  userAuthToken,
  userController.updateUserAddress
);
module.exports = router;
