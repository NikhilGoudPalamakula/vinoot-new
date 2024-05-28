const express = require("express");
const billingController = require("../controllers/BillingController");

const router = express.Router();

router.post("/billing", billingController.createBilling);
router.get("/billing:frid", billingController.fetchBillingData);
// router.get('/billingdatasuperadmin', billingController.fetchAllBillingData);

router.get("/billing", billingController.getAllBillingData);

router.get(
  "/billings/:franchiseID/:patientId/:billNumber",
  billingController.getPatientbillingById
);
router.put(
  "/billings/:franchiseID/:patientId/:billNumber",
  billingController.updatePatientbillingById
);

module.exports = router;
