const Milkman = require('../../models/MilkmanSchema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();
const secretKey = process.env.SECRET_KEY;

const registerMilkman = async (req, res) => {
  try {
    const { name, mobileNumber, password, address, location } = req.body;

  
    const { coordinates, type } = location;
    const [latitude,longitude] = coordinates;
    
    // Check if milkman with the given mobile number already exists
    const existingMilkman = await Milkman.findOne({ mobileNumber });

    if (existingMilkman) {
      return res.status(400).json({ message: 'This mobile number is already registered.' });
    }

    // Hash the password using bcrypt
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new milkman document
    const newMilkman = new Milkman({
      name,
      mobileNumber,
      password: hashedPassword,
      address,
      location: {
        type,
        coordinates: [longitude, latitude],
      },
    });

    // Save the new milkman to the database
    await newMilkman.save();

    // Generate a JWT token for authentication
    const token = jwt.sign({ mobileNumber: newMilkman.mobileNumber, _id: newMilkman._id }, secretKey, { expiresIn: '1h' });

    // Respond with success message and token
    res.status(201).json({ message: 'Milkman registered successfully', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Registration failed' });
  }
};

module.exports = {
  registerMilkman,
};
