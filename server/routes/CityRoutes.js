const express = require("express");
const router = express.Router();
const cityController = require("../controllers/CityController");

router.get("/cities", cityController.getAllCities);
router.post("/cities", cityController.addCity);

module.exports = router;
