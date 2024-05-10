// const express = require("express");
// const router = express.Router();
// const stateController = require("../controllers/StateController");

// router.get("/states", stateController.getAllStates);
// router.post("/states", stateController.addState);
// router.get("/suggeststates", stateController.suggeststates);

// module.exports = router;

// routes/StateRoutes.js

const express = require("express");
const router = express.Router();
const stateController = require("../controllers/StateController");

router.get("/states", stateController.getAllStates);
router.post("/states", stateController.addState);
router.get("/suggeststates", stateController.suggeststates);
router.put("/states/:stateId/toggle", stateController.toggleStateStatus); // updating toggling state status

module.exports = router;
