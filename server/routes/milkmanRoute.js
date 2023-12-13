    const express = require('express');
    const router = express.Router();
    const {registerMilkman} = require('../controllers/auth/milkmanRegister');
    const{ milkmanLogin}=require('../controllers/auth/milkmanLogin')
  
    // const milkmanProfileController = require('../controllers/auth/milkmanProfile');

    router.post('/mregister', registerMilkman);

    router.post('/mlogin', milkmanLogin);
// milkmanRoutes.js


// Route to get nearby milkmen



    // router.post('/createProfile', milkmanProfileController.createMilkmanProfile);
    module.exports = router;
