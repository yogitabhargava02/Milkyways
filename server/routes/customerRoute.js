
const express = require('express');
const router = express.Router();
const { customerRegister } = require('../controllers/auth/Customer/customerRegister');
const { customerLogin } = require('../controllers/auth/Customer/customerLogin');
const milkmanListController = require('../controllers/auth/Customer/milkmanListController'); 
const {initiateForgotPassword} = require('../controllers/auth/Customer/customerForgot');
const customerResetPasswordController = require('../controllers/auth/Customer/customerReset');
// const { createCustomerProfile } = require('../controllers/auth/Customer/customerProfile');

router.post('/reset-password', customerResetPasswordController.resetPassword);

router.post('/forgot-password', initiateForgotPassword);
router.post('/cregister', customerRegister);
router.post('/clogin', customerLogin);
router.get('/milkman-list', milkmanListController.getAllMilkmanProfiles); 


module.exports = router;
