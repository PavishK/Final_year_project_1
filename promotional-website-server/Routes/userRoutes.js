const express = require("express");
const {
  loginController,
  registerController,
  updateUserData,
  findUserAndUpdate,
  updatePassword
} = require("../Controllers/userController");

const { protect } = require("../middleware/authMiddleware");

const Router = express.Router();

Router.post("/login", loginController);
Router.post("/register", registerController);
Router.put("/update-profile/:id", updateUserData);
Router.get("/get-user-info/:id",findUserAndUpdate);
Router.put("/update-password/:id",updatePassword);
module.exports = Router;
