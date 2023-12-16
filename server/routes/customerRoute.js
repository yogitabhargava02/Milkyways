
const express = require('express');
const router = express.Router();
const { customerRegister } = require('../controllers/auth/Customer/customerRegister');
const { customerLogin } = require('../controllers/auth/Customer/customerLogin');
// const milkmanListController = require('../controllers/auth/Customer/milkmanListController'); 
// const createCustomerProfile=require('../controllers/auth/Customer/CustomerProfile');
const {initiateForgotPassword} = require('../controllers/auth/Customer/customerForgot');
const customerResetPasswordController = require('../controllers/auth/Customer/customerReset');
  
const subscriptionController = require('../controllers/auth/Customer/customerSubscription');
const milkmanController = require('../controllers/auth/Customer/milkmanController');
router.post('/reset-password', customerResetPasswordController.resetPassword);





router.post('/forgot-password', initiateForgotPassword);
router.post('/cregister', customerRegister);
router.post('/clogin', customerLogin);
// router.post('/createProfile', createCustomerProfile.createCustomerProfile )
// router.get('/milkman-list', milkmanListController.getAllMilkmanProfiles); 

router.get('/nearby', async (req, res) => {
    try {
      const customerLocation = {
        type: 'Point',
        coordinates: [parseFloat(req.query.longitude), parseFloat(req.query.latitude)],
      };
  
      const maxDistance = req.query.maxDistance || 5000; // Default to 5 km if not provided
  
      const nearbyMilkmen = await milkmanController.getNearbyMilkmen(customerLocation, maxDistance);
  
      res.json({ nearbyMilkmen });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

// POST /subscribe

router.post('/subscribe', async (req, res) => {
  const { customerId, milkmanId } = req.body;
  console.log('Attempting to subscribe customer', customerId, 'to milkman', milkmanId);

  const result = await subscriptionController.subscribeCustomerToMilkman(customerId, milkmanId);

  console.log('Subscription result:', result);

  if (result.success) {
    return res.status(200).json({ message: result.message });
  } else {
    return res.status(400).json({ error: result.message });
  }
});





module.exports = router;
