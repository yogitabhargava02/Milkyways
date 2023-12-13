const Customer = require('../../../models/CustomerSchema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const customerLogin = async (req, res) => {
  try {
    const { mobileNumber, password, location } = req.body;

    // Logging for debugging purposes
    console.log('Received Location:', location);

    const { coordinates, type } = location || {};
    const [latitude, longitude] = coordinates || [];

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

    // Use the provided location or the existing customer's location
    const userLocation = location || customer.location;

    res.status(200).json({ token, userLocation });
  } catch (error) {
    console.error('Error in customerLogin:', error);

    // Provide a more informative error response
    res.status(500).json({ error: 'Login failed. Please try again.' });
  }
};

module.exports = {
  customerLogin,
};
