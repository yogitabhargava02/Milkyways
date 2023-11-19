// routes/customerRoute.js
const express = require('express');
const router = express.Router();
const { customerRegister } = require('../controllers/auth/Customer/customerRegister');
const { customerLogin } = require('../controllers/auth/Customer/customerLogin');
const milkmanListController = require('../controllers/auth/Customer/milkmanListController'); 
const {initiateForgotPassword} = require('../controllers/auth/Customer/customerForgot');
const customerResetPasswordController = require('../controllers/auth/Customer/customerReset');

// Define the route to reset the password for customers
router.post('/reset-password', customerResetPasswordController.resetPassword);

// Define the route to initiate the forgot password process for customers
router.post('/forgot-password', initiateForgotPassword);
router.post('/cregister', customerRegister);
router.post('/clogin', customerLogin);
router.get('/milkman-list', milkmanListController.getAllMilkmanProfiles); 


module.exports = router;
