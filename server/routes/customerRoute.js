const express = require('express');
const router = express.Router();
const {customerRegister}=require('../controllers/auth/Customer/customerRegister');
const {customerLogin}=require('../controllers/auth/Customer/customerLogin');
const {customerProfile}=require('../controllers/auth/Customer/customerProfile')



router.post('/cregister', customerRegister);
router.post('/clogin', customerLogin);
// router.post('/cprofile', customerProfile)
module.exports = router;
