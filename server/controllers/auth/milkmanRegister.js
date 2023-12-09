const Milkman = require('../../models/MilkmanSchema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const secretKey = process.env.SECRET_KEY;

const registerMilkman = async (req, res) => {
  try {
    const { 
      name,
      email,
      mobileNumber,
      password,
      location: {
        type = 'Point',
        coordinates: [longitude, latitude] = [0, 0],
      } = {}
    } = req.body;

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
      password: hashedPassword,
      location: {
        type,
        coordinates: [longitude, latitude],
      },
    });
    
    // Save the new Milkman to the database
    await newMilkman.save();

    const token = jwt.sign({ email: newMilkman.email, _id: newMilkman._id }, secretKey, { expiresIn: '1h' });

    res.status(201).json({ message: 'Milkman registered successfully', token });
  } catch (error) {
    console.error('Error in registerMilkman:', error);
    res.status(500).json({ message: 'Registration failed' });
  }
};
const loginMilkman = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the email exists in the database
    const existingMilkman = await Milkman.findOne({ email });

    if (!existingMilkman) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, existingMilkman.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate a token for successful login
    const token = jwt.sign(
      { email: existingMilkman.email, _id: existingMilkman._id },
      secretKey,
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error in loginMilkman:', error);
    res.status(500).json({ message: 'Login failed' });
  }
};


module.exports = {
  registerMilkman,
  loginMilkman,
};
