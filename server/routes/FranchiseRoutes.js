const express = require('express');
const router = express.Router();
const franchiseController = require('../controllers/FranchiseRegController');
const adminController = require('../controllers/FranchiseAdminController');

router.post('/franchise', franchiseController.createFranchise);
router.post('/admin', adminController.createAdmin);
router.post('/franchiselogin', adminController.loginfranchiseUser);
router.get('/franchisefetchAdmin', adminController.getAllFranchiseAmins);
router.patch('/franchisestateupdate/:id', adminController.updateFranchiseAdminActiveState);
router.get('/franchisefetchusers/:frid', adminController.getExceptAllFranchiseAmins);


module.exports = router;



// const express = require('express');
// const router = express.Router();
// const franchiseController = require('../controllers/FranchiseRegController');
// const adminController = require('../controllers/FranchiseAdminController');

// router.post('/franchise', franchiseController.createFranchise);
// router.post('/admin', adminController.createAdmin);
// router.post('/franchiselogin', adminController.loginfranchiseUser);
// router.get('/franchisefetch', adminController.getAllFranchiseAmins);
// // router.patch('/franchisestateupdate/:id', adminController.updateFranchiseAdminActiveState);
// router.patch('/updateFranchiseAdmin/:id', franchiseController.updateFranchiseAdmin);
// router.delete('/deleteFranchiseAdmin/:id', adminController.deleteAdmin);

// module.exports = router;




// const express = require('express');
// const router = express.Router();
// const franchiseAdminController = require('../controllers/FranchiseAdminController');

// router.post('/franchise', franchiseController.createFranchise);
// router.post('/admin', franchiseAdminController.createAdmin);
// router.get('/franchisefetch', franchiseAdminController.getAllFranchiseAmins);
// router.post('/franchiselogin', franchiseAdminController.loginfranchiseUser);
// router.patch('/updateFranchiseAdmin/:id', franchiseAdminController.updateFranchiseAdmin);
// router.delete('/deleteFranchiseAdmin/:id', franchiseAdminController.deleteAdmin);

// module.exports = router;