// const express = require("express");
// const router = express.Router();
// const areaController = require("../controllers/AreaController");

// router.get("/areas", areaController.getAllAreas);
// router.post("/areas", areaController.addArea);

// module.exports = router;


// routes/areaRoutes.js
const express = require("express");
const router = express.Router();
const areaController = require("../controllers/AreaController");

router.get("/areas", areaController.getAllAreas);
router.post("/areas", areaController.addArea);
router.put("/areas/:areaId/toggle", areaController.toggleAreaStatus);

module.exports = router;
