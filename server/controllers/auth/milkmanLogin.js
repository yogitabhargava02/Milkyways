const Milkman = require('../../models/MilkmanSchema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const secretKey = process.env.SECRET_KEY;

const milkmanLogin = async (req, res) => {
  try {
    const { mobileNumber, password, location } = req.body;

    const { coordinates, type } = location || {};
    const [latitude, longitude] = coordinates || [];

    const existingMilkman = await Milkman.findOne({ mobileNumber });

    if (!existingMilkman) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, existingMilkman.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { mobileNumber: existingMilkman.mobileNumber, _id: existingMilkman._id },
      secretKey,
      { expiresIn: '1h' } // Adjust the token expiry time as needed
    );

    const userLocation = location || existingMilkman.location;


    res.status(200).json({ message: 'Login successful', token, userLocation });
  } catch (error) {
    console.error('Error in milkmanLogin:', error.message); // Log only the error message
    res.status(500).json({ message: 'Login failed' });
  }
};

module.exports = {
  milkmanLogin,
};
