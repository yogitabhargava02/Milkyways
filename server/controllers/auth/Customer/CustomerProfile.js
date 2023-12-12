const Customer = require('../../../models/CustomerProfile');
// const CustomerProfile = require('../models/CustomerProfile');

// Controller function for creating a customer profile
const createCustomerProfile = async (req, res) => {
  try {
    // Extract data from the request body
    const { customerId, name, mobileNumber, billingInfo } = req.body;

    // Check if the customer with the provided ID exists
    const existingCustomer = await Customer.findById(customerId);

    if (!existingCustomer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    // Create a new customer profile instance
    const newCustomerProfile = new CustomerProfile({
      customer: customerId,
      name,
      mobileNumber,
      billingInfo,
    });

    // Save the customer profile to the database
    await newCustomerProfile.save();

    // Respond with a success message or the created customer profile object
    res.status(201).json({ message: 'Customer profile created successfully', customerProfile: newCustomerProfile });
  } catch (error) {
    // Handle errors (e.g., validation error, duplicate key error)
    console.error('Error creating customer profile:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller function for retrieving a customer profile by ID
const getCustomerProfileById = async (req, res) => {
  try {
    const { customerId } = req.params;

    // Find the customer profile by customer ID
    const customerProfile = await CustomerProfile.findOne({ customer: customerId });

    if (!customerProfile) {
      return res.status(404).json({ error: 'Customer profile not found' });
    }

    // Respond with the customer profile object
    res.status(200).json({ customerProfile });
  } catch (error) {
    // Handle errors
    console.error('Error retrieving customer profile:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller function for updating a customer profile
const updateCustomerProfile = async (req, res) => {
  try {
    const { customerId } = req.params;
    const { name, mobileNumber, billingInfo } = req.body;

    // Find and update the customer profile by customer ID
    const updatedCustomerProfile = await CustomerProfile.findOneAndUpdate(
      { customer: customerId },
      { name, mobileNumber, billingInfo },
      { new: true } // Return the updated document
    );

    if (!updatedCustomerProfile) {
      return res.status(404).json({ error: 'Customer profile not found' });
    }

    // Respond with the updated customer profile object
    res.status(200).json({ message: 'Customer profile updated successfully', customerProfile: updatedCustomerProfile });
  } catch (error) {
    // Handle errors
    console.error('Error updating customer profile:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createCustomerProfile,
  getCustomerProfileById,
  updateCustomerProfile,
};
