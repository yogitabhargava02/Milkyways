const jwt = require('jsonwebtoken');
const Milkman = require('../../models/milkman'); // Assuming your model is named Milkman

const createMilkmanProfile = async (req, res) => {
  try {
    const {
      name,
      mobileNumber,
      password,
      location,
      profileImage,
      billingInfo,
      availability,
    } = req.body;

    // Create a new milkman instance
    const newMilkman = new Milkman({
      name,
      mobileNumber,
      password,
      location: {
        type: 'Point',
        coordinates: location.coordinates,
      },
      profileImage,
      billingInfo,
      availability,
    });

    // Save the milkman to the database
    await newMilkman.save();

    // Respond with a success message or the created milkman object
    res.status(201).json({ message: 'Milkman profile created successfully', milkman: newMilkman });
  } catch (error) {
    // Handle errors (e.g., validation error, duplicate key error)
    console.error('Error creating milkman profile:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateMilkmanProfile = async (req, res) => {
  try {
    const { milkmanId } = req.params;
    const updateFields = req.body;

    // Find the milkman by ID and update the fields
    const updatedMilkman = await Milkman.findByIdAndUpdate(
      milkmanId,
      { $set: updateFields },
      { new: true } // Return the updated document
    );

    if (!updatedMilkman) {
      return res.status(404).json({ error: 'Milkman not found' });
    }

    // Respond with the updated milkman object
    res.status(200).json({ message: 'Milkman profile updated successfully', milkman: updatedMilkman });
  } catch (error) {
    // Handle errors
    console.error('Error updating milkman profile:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createMilkmanProfile,
  updateMilkmanProfile,
};
