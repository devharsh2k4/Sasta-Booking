const express = require('express');
const {CreateNewAdventureDetailController}= require("./../controllers/AdventureDetail.Controller");
const AdventureRouter = require('./Adventure.Router');
const AdventureDetailRouter = express.Router();


AdventureRouter.post("/add",CreateNewAdventureDetailController)

module.exports = AdventureDetailRouter;