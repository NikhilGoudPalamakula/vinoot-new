// routes/installmentRoutes.js

const express = require('express');
const router = express.Router();
const installmentController = require('../controllers/BillingInstallmentsController');

// Route to post installment data
router.post('/installments', installmentController.createInstallment);

// Route to fetch all installments
router.get('/installments', installmentController.getAllInstallments);

module.exports = router;
