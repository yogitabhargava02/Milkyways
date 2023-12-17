    const express = require('express');
    const router = express.Router();
    const {registerMilkman} = require('../controllers/auth/milkmanRegister');
    const{ milkmanLogin}=require('../controllers/auth/milkmanLogin')
    
    const {getSubscribedCustomers} = require('../controllers/auth/getSubscribedCustomers');
const {markDelivered}=require('../controllers/services/markDelivered');


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
