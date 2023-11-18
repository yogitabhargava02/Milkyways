const Milkman = require('../../../models/MilkmanSchema');

const getMilkmanProfile = async (req, res) => {
  try {
    // Get the milkman ID from the authenticated user's token or any other means
    const milkmanId = req.user._id; // Assuming user ID is stored in req.user

    // Fetch the milkman profile from the database
    const milkman = await Milkman.findById(milkmanId);

    if (!milkman) {
      return res.status(404).json({ message: 'Milkman not found' });
    }

    // Construct the milkman profile response
    const milkmanProfile = {
      name: milkman.name,
      email: milkman.email,
      mobileNumber: milkman.mobileNumber,
      milkInfo: milkman.milkInfo,
      profileImage: milkman.profileImage,  // Include profileImage
      deliveryTime: milkman.deliveryTime,  // Include deliveryTime
      location: milkman.location,
      // Add any other fields you want to include in the profile
    };

    res.status(200).json({ milkmanProfile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching milkman profile' });
  }
};

module.exports = {
  getMilkmanProfile,
};
