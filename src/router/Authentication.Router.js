const express = require("express");

const {CreateNewUserController} = require("./../controllers/User.controller")

const UserRouter = express.Router();

UserRouter.post("/signup", CreateNewUserController)
UserRouter.post("/signin", CreateNewUserController)

module.exports = UserRouter;