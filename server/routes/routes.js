const express = require('express');
const router = express.Router();
const milkmanController = require('../controllers/auth/milkmanRegister');
const { milkmanLogin } = require('../controllers/auth/milkmanLogin');
const customerRegister=require('../controllers/auth/Customer/customerRegister');
const customerLogin=require('../controllers/auth/Customer/customerLogin');
router.post('/mregister', milkmanController.registerMilkman);


// Route for milkman login
router.post('/mlogin', milkmanLogin);

;
module.exports = router;
