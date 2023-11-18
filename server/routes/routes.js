const express = require('express');
const router = express.Router();
const milkmanController = require('../controllers/auth/milkmanRegister');
const { milkmanLogin } = require('../controllers/auth/milkmanLogin');
const customerRegister=require('../controllers/auth/Customer/customerRegister');
const customerLogin=require('../controllers/auth/Customer/customerLogin');


const milkmanProfileController = require('../controllers/auth/Milkman/milkmanProfile');

// Define the route to fetch the milkman profile

router.post('/mregister', milkmanController.registerMilkman);

// Route for milkman login
router.post('/mlogin', milkmanLogin);
router.get('/profile', milkmanProfileController.getMilkmanProfile);
;
module.exports = router;
