const express = require("express");
const {
    CreateNewCityConytoller,
    GetAllCityController,
    UpdateCityController,
    DeleteCityController
} = require("./../controllers/City.controller")

const {AdminAuthorizationMidleware} = require('./../middlewares/Authorization.middleware')

const CityRouter = express.Router();

CityRouter.post("/add",AdminAuthorizationMidleware, CreateNewCityConytoller)
CityRouter.get("/all", GetAllCityController)
CityRouter.put("/update/:id", UpdateCityController)
CityRouter.delete("/delete/:id", DeleteCityController)

module.exports = CityRouter;