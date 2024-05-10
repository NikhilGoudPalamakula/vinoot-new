// const express = require("express");
// const router = express.Router();
// const cityController = require("../controllers/CityController");

// router.get("/cities", cityController.getAllCities);
// router.post("/cities", cityController.addCity);

// module.exports = router;

const express = require("express");
const router = express.Router();
const cityController = require("../controllers/CityController");

router.get("/cities", cityController.getAllCities);
router.post("/cities", cityController.addCity);
router.put("/cities/:cityId/toggle", cityController.toggleCityStatus);

module.exports = router;
