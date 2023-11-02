const express = require('express');
const router = express.Router();
const milkmanController = require('../controllers/auth/milkmanRegister');
const { milkmanLogin } = require('../controllers/auth/milkmanLogin');

router.post('/register', milkmanController.registerMilkman);


// Route for milkman login
router.post('/login', milkmanLogin);
module.exports = router;
