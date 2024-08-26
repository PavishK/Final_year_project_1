const express = require("express");
const {
  loginController,
  registerController,
} = require("../Controllers/userController");

const { protect } = require("../middleware/authMiddleware");

const Router = express.Router();

Router.post("/login", loginController);
Router.post("/register", registerController);

module.exports = Router;
