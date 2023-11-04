const express = require('express');
const router = express.Router();
const {customerRegister}=require('../controllers/auth/Customer/customerRegister');
const {customerLogin}=require('../controllers/auth/Customer/customerLogin');




router.post('/cregister', customerRegister);
router.post('/clogin', customerLogin);
module.exports = router;
