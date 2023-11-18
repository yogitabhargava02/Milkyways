// controllers/auth/Milkman/milkmanListController.js
const Milkman = require('../../../models/MilkmanSchema');

const getAllMilkmanProfiles = async (req, res) => {
  try {
    const milkmanProfiles = await Milkman.find();
    res.status(200).json({ milkmanProfiles });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching milkman profiles' });
  }
};

module.exports = {
  getAllMilkmanProfiles,
};
