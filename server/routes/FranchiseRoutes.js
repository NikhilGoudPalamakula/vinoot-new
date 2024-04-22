const express = require('express');
const router = express.Router();
const franchiseController = require('../controllers/FranchiseRegController');
const adminController = require('../controllers/FranchiseAdminController');

router.post('/franchise', franchiseController.createFranchise);
router.post('/admin', adminController.createAdmin);

module.exports = router;
