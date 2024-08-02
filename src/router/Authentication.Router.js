const express = require("express");

const {CreateNewUserController,SignInUserController} = require("./../controllers/User.controller")

const UserRouter = express.Router();

UserRouter.post("/signup", CreateNewUserController)
UserRouter.post("/signin", SignInUserController)

module.exports = UserRouter;