    const express = require('express');
    const router = express.Router();
    const {registerMilkman} = require('../controllers/auth/milkmanRegister');
    const{ milkmanLogin}=require('../controllers/auth/milkmanLogin')
    // const milkmanProfileController = require('../controllers/auth/milkmanProfile');
    const {getSubscribedCustomers} = require('../controllers/auth/getSubscribedCustomers');

    router.get('/:milkmanId/subscribedCustomers', getSubscribedCustomers);
    
    router.post('/mregister', registerMilkman);

    router.post('/mlogin', milkmanLogin);
   // milkmanRoutes.js

// milkmanRoutes.js


// Route to get nearby milkmen



    // router.post('/createProfile', milkmanProfileController.createMilkmanProfile);
    module.exports = router;
