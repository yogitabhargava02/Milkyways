    const express = require('express');
    const router = express.Router();
    const {registerMilkman} = require('../controllers/auth/milkmanRegister');
    const{ milkmanLogin}=require('../controllers/auth/milkmanLogin')
    
    const {getSubscribedCustomers} = require('../controllers/auth/getSubscribedCustomers');
const {markDelivered}=require('../controllers/services/markDelivered');
const billingService = require('../controllers/services/calculateBill');

// Sample route to calculate the bill for a specific customer
router.get('/calculateBill/:milkmanId/:customerId', async (req, res) => {
  try {
    const milkmanId = req.params.milkmanId;
    const customerId = req.params.customerId;

    const result = await billingService.calculateBillForCustomer(milkmanId, customerId);

    res.status(200).json(result);
  } catch (error) {
    console.error('Error in calculateBill route:', error.message);
    res.status(500).json({ success: false, message: 'Error calculating bill' });
  }
});

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
    router.post('/markDelivered', async (req, res) => {
      try {
        const { milkmanId, customerId, date } = req.body;
        const result = await markDelivered(milkmanId, customerId, date);
        res.json(result);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    module.exports = router;
