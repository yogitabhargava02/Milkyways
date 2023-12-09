const jwt = require('jsonwebtoken');
const MilkmanProfile = require('../../models/milkmanProfile');

// Controller function for creating a milkman profile
const createMilkmanProfile = async (req, res) => {
  try {
    // Extract data from the request body
   // Extract data from the request body
// Extract data from the request body
const {
  name,
  email,
  profileImage,
  contactInformation,
  address,
  coordinates,
  city,
  dairyProductsOffered,
  deliverySchedule,
  // Other fields as needed
} = req.body;

// Correct the order of coordinates
const [latitude, longitude] = coordinates;

// Create a new milkman profile instance
const newMilkmanProfile = new MilkmanProfile({
  name,
  email,
  profileImage,
  contactInformation,
  address,
  coordinates: {
    type: "Point",
    coordinates: [longitude, latitude], // Switched the order
  },
  city,
  dairyProductsOffered,
  deliverySchedule,
  // Other fields as needed
});

// Save the milkman profile to the database
await newMilkmanProfile.save();

// Respond with a success message or the created milkman profile object
res.status(201).json({ message: 'Milkman profile created successfully', milkmanProfile: newMilkmanProfile });

    // res.status(201).json({ message: 'Milkman profile created successfully', milkmanProfile: newMilkmanProfile });
  } catch (error) {
    // Handle errors (e.g., validation error, duplicate key error)
    console.error('Error creating milkman profile:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createMilkmanProfile,
};
