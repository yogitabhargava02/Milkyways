const Milkman = require('../../models/MilkmanSchema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); 
require('dotenv').config();

const milkmanLogin = async (req, res) => {
  try {
    const { mobileNumber, password } = req.body;

    const milkman = await Milkman.findOne({ mobileNumber });

    if (!milkman) {
      return res.status(401).json({ error: 'Invalid mobileNumber or password' });
    }

    const passwordMatch = await bcrypt.compare(password, milkman.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid mobileNumber or password' });
    }

    const token = jwt.sign(
      { _id: milkman._id, mobileNumber: milkman.mobileNumber }, 
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
  milkmanLogin,
};
