const Customer = require('../../../models/CustomerSchema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();
const secretKey = process.env.SECRET_KEY;

const customerRegister = async (req, res) => {
  try {
    
    const { name, mobileNumber, password, address, location } = req.body;

  
    const { coordinates, type } = location;
    const [latitude,longitude] = coordinates;
    
    const existingCustomer = await Customer.findOne({ mobileNumber });

    if (existingCustomer) {
      return res.status(400).json({ message: 'This number already registered' });
    }

    
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

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

    const token = jwt.sign({ email: newCustomer.mobileNumber, _id: newCustomer._id }, secretKey, { expiresIn: '1h' });

    res.status(201).json({ message: 'Customer registered successfully', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Registration failed' });
  }
};

module.exports = {
  customerRegister,
};
