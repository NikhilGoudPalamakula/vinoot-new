const express = require('express');
const billingController = require('../controllers/BillingController');

const router = express.Router();

router.post('/billing', billingController.createBilling);
router.get('/billing', billingController.fetchBillingData);

module.exports = router;
