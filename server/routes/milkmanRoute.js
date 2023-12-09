const express = require('express');
const router = express.Router();
const milkmanController = require('../controllers/auth/milkmanRegister');
const { milkmanLogin } = require('../controllers/auth/milkmanLogin');
const milkmanProfileController = require('../controllers/auth/milkmanProfile');

router.post('/mregister', milkmanController.registerMilkman);

router.post('/mlogin', milkmanController.loginMilkman);

router.post('/createProfile', milkmanProfileController.createMilkmanProfile);
module.exports = router;
