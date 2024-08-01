const express = require("express");
const {
    CreateNewCityConytoller,
    GetAllCityController,
    UpdateCityController,
    DeleteCityController
} = require("./../controllers/City.controller")

const CityRouter = express.Router();

CityRouter.post("/add", CreateNewCityConytoller)
CityRouter.get("/all", GetAllCityController)
CityRouter.put("/update/:id", UpdateCityController)
CityRouter.delete("/delete/:id", DeleteCityController)

module.exports = CityRouter;