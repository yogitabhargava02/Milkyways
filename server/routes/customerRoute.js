// routes/customerRoute.js
const express = require('express');
const router = express.Router();
const { customerRegister } = require('../controllers/auth/Customer/customerRegister');
const { customerLogin } = require('../controllers/auth/Customer/customerLogin');
const milkmanListController = require('../controllers/auth/Customer/milkmanListController'); 

router.post('/cregister', customerRegister);
router.post('/clogin', customerLogin);
router.get('/milkman-list', milkmanListController.getAllMilkmanProfiles); 


module.exports = router;
