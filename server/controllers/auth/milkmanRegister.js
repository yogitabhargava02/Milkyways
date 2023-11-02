const Milkman = require('../../models/MilkmanSchema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const secretKey = process.env.SECRET_KEY;

const registerMilkman = async (req, res) => {
  try {
    const { name, email, mobileNumber, password, milkInfo, latitude, longitude } = req.body;

   
    const existingMilkman = await Milkman.findOne({ email });

    if (existingMilkman) {
      return res.status(400).json({ message: 'Email already registered' });
    }

   
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newMilkman = new Milkman({
      name,
      email,
      mobileNumber,
      password: hashedPassword, // Store the hashed password
      milkInfo,
      location: {
        type: 'Point',
        coordinates: [longitude, latitude],
      },
    });

   
    await newMilkman.save();

   
    const token = jwt.sign({ email: newMilkman.email, _id: newMilkman._id }, secretKey, { expiresIn: '1h' });

    res.status(201).json({ message: 'Milkman registered successfully', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Registration failed' });
  }
};

module.exports = {
  registerMilkman,
};
