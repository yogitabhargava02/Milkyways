    const express = require('express');
    const router = express.Router();
    const {registerMilkman} = require('../controllers/auth/milkmanRegister');
    const{ milkmanLogin}=require('../controllers/auth/milkmanLogin')
    // const milkmanProfileController = require('../controllers/auth/milkmanProfile');
    const {getSubscribedCustomers} = require('../controllers/auth/getSubscribedCustomers');

    router.get('/:milkmanId/subscribedCustomers', async (req, res) => {
        try {
          const milkmanId = req.params.milkmanId;
          const result = await getSubscribedCustomers(milkmanId);
          res.status(200).json(result);
        } catch (error) {
          console.error(error);
          res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
      });

    
    router.post('/mregister', registerMilkman);

    router.post('/mlogin', milkmanLogin);
   // milkmanRoutes.js

// milkmanRoutes.js


// Route to get nearby milkmen



    // router.post('/createProfile', milkmanProfileController.createMilkmanProfile);
    module.exports = router;
