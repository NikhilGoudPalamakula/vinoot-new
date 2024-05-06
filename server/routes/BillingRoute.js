const express = require('express');
const billingController = require('../controllers/BillingController');

const router = express.Router();

router.post('/billing', billingController.createBilling);
router.get('/billing:frid', billingController.fetchBillingData);
router.get('/billingdatasuperadmin', billingController.fetchAllBillingData);

module.exports = router;
