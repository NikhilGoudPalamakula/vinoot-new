const express = require("express");
const router = express.Router();
const areaController = require("../controllers/AreaController");

router.get("/areas", areaController.getAllAreas);
router.post("/areas", areaController.addArea);

module.exports = router;
