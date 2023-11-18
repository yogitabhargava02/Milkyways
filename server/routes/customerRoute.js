// routes/customerRoute.js
const express = require('express');
const router = express.Router();
const { customerRegister } = require('../controllers/auth/Customer/customerRegister');
const { customerLogin } = require('../controllers/auth/Customer/customerLogin');
const { customerProfile } = require('../controllers/auth/Customer/customerProfile');
const milkmanListController = require('../controllers/auth/Customer/milkmanListController'); // Add this line

router.post('/cregister', customerRegister);
router.post('/clogin', customerLogin);
router.get('/milkman-list', milkmanListController.getAllMilkmanProfiles); // Add this line
// router.post('/cprofile', customerProfile);

module.exports = router;
