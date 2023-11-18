const express = require('express');
const router = express.Router();
const milkmanController = require('../controllers/auth/milkmanRegister');
const { milkmanLogin } = require('../controllers/auth/milkmanLogin');
const milkmanProfileController = require('../controllers/auth/Milkman/milkmanProfile');

router.post('/mregister', milkmanController.registerMilkman);

router.post('/mlogin', milkmanLogin);
router.get('/profile', milkmanProfileController.getMilkmanProfile);
module.exports = router;
