const express = require("express");
const router = express.Router();
const stateController = require("../controllers/StateController");

router.get("/states", stateController.getAllStates);
router.post("/states", stateController.addState);

module.exports = router;
