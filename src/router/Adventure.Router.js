const express = require("express");
const { CreateNewAdventureController, GetAllAdventureInACityController, UpdateAdventureInACityController, DeleteAdventureInACityController} = require("./../controllers/Adventure.Controller")

const AdventureRouter = express.Router();

AdventureRouter.post("/add", CreateNewAdventureController)
AdventureRouter.get("/all", GetAllAdventureInACityController)
AdventureRouter.put("/update",UpdateAdventureInACityController)
AdventureRouter.delete('/delete',DeleteAdventureInACityController)


                                         
module.exports = AdventureRouter;