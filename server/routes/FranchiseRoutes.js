const express = require('express');
const router = express.Router();
const franchiseController = require('../controllers/FranchiseRegController');
const adminController = require('../controllers/FranchiseAdminController');

router.post('/franchise', franchiseController.createFranchise);
router.post('/admin', adminController.createAdmin);
router.post('/franchiselogin', adminController.loginfranchiseUser);
router.get('/franchisefetch', adminController.getAllFranchiseAmins);
router.patch('/franchisestateupdate/:id', adminController.updateFranchiseAdminActiveState);

module.exports = router;
