const Customer = require('../../../models/CustomerSchema'); 
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const customerLogin = async (req, res) => {
  try {
    const { mobileNumber, password } = req.body;

    const customer = await Customer.findOne({ mobileNumber }); 

    if (!customer) {
      return res.status(401).json({ error: 'Invalid mobileNumber or password' });
    }

    const passwordMatch = await bcrypt.compare(password, customer.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid mobileNumber or password' });
    }

    const token = jwt.sign(
      { _id: customer._id, mobileNumber: customer.mobileNumber },
      process.env.SECRET_KEY, 
      { expiresIn: '1h' }
    );

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Login failed' });
  }
};

module.exports = {
  customerLogin,
};
