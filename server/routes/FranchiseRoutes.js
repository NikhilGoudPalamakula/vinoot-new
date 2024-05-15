const express = require("express");
const router = express.Router();
const franchiseController = require("../controllers/FranchiseRegController");
const adminController = require("../controllers/FranchiseAdminController");

router.post("/franchise", franchiseController.createFranchise);
router.get("/franchise", franchiseController.getAllFranchises);
router.put("/franchise/:id/toggle", franchiseController.toggleFranchiseStatus);
router.post("/admin", adminController.createAdmin);
router.post("/franchiselogin", adminController.loginfranchiseUser);
router.get("/franchisefetchAdmin", adminController.getAllFranchiseAmins);
router.patch(
  "/franchisestateupdate/:id",
  adminController.updateFranchiseAdminActiveState
);
router.patch(
  "/franchisestateupdatepart2/:id",
  adminController.updateFranchiseAdminActiveStatepart2
);

router.get(
  "/franchisefetchusers/:frid",
  adminController.getExceptAllFranchiseAmins
);
router.get("/doctors", adminController.getDoctors);

router.get(
  "/franchisefetchAdmins/:franchiseID",
  adminController.getFranchiseAdminsByFranchiseID
);

module.exports = router;
