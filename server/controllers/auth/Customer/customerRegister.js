const Customer = require('../../../models/CustomerSchema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();
const secretKey = process.env.SECRET_KEY;

const customerRegister = async (req, res) => {
  try {
    const { name, mobileNumber, password, address, location } = req.body;
console.log('Received data:', { name, mobileNumber, password, address, location });


    // Check for valid coordinates
    const { coordinates, type } = location;
    const { latitude, longitude } = coordinates;
    console.log('Received coordinates:', coordinates);
    if (isNaN(latitude) || isNaN(longitude)) {
      return res.status(400).json({ error: 'Invalid coordinates provided.' });
    }

    const existingCustomer = await Customer.findOne({ mobileNumber });

    if (existingCustomer) {
      return res.status(400).json({ error: 'This number is already registered.' });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new customer with valid coordinates
    const newCustomer = new Customer({
      name,
      mobileNumber,
      password: hashedPassword,
      address,
      location: {
        type,
        coordinates: [longitude, latitude],
      },
    });

    await newCustomer.save();

    // Sign a token for the new customer
    const token = jwt.sign({ email: newCustomer.mobileNumber, _id: newCustomer._id }, secretKey, { expiresIn: '1h' });

    res.status(201).json({ message: 'Customer registered successfully', token });
  } catch (error) {
    console.error(error);

    // Handle token signing errors separately
    if (error.name === 'JsonWebTokenError') {
      return res.status(500).json({ error: 'Error signing the authentication token.' });
    }

    res.status(500).json({ error: 'Registration failed' });
  }
};

module.exports = {
  customerRegister,
};
