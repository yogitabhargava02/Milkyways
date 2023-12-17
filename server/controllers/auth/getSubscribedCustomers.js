const mongoose = require('mongoose');
const Milkman = require('../../models/MilkmanSchema');

async function getSubscribedCustomers(milkmanId) {
  try {
    // Ensure that the milkmanId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(milkmanId)) {
      throw new Error('Invalid milkmanId');
    }

    const milkman = await Milkman.findById(milkmanId).populate('subscribedCustomers.customer');

    // Check if milkman with the specified ID is found
    if (!milkman) {
      throw new Error('Milkman not found');
    }

    // Log the milkman to verify it's retrieved correctly
    console.log('Milkman:', milkman);

    // Check if subscribedCustomers is present in the milkman document
    if (!milkman.subscribedCustomers || milkman.subscribedCustomers.length === 0) {
      console.log('No subscribed customers found for this milkman.');
      return { success: true, customers: [] }; // Return an empty array if no subscribed customers
    }

    // Extract subscribedCustomers from the milkman
    const subscribedCustomers = milkman.subscribedCustomers.map((subscription) => ({
      customer: subscription.customer,
      startDate: subscription.startDate,
      // Add other relevant subscription details as needed
    }));

    // Log subscribedCustomers to verify the data
    console.log('Subscribed Customers:', subscribedCustomers);

    return { success: true, customers: subscribedCustomers };
  } catch (error) {
    console.error('Error fetching subscribed customers:', error.message);
    return { success: false, message: 'Failed to fetch subscribed customers' };
  }
}

module.exports = {
  getSubscribedCustomers,
};
