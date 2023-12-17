// services/deliveryService.js
const Milkman = require('../../models/MilkmanSchema'); // Assuming you have a Milkman model

const markDelivered = async (milkmanId, customerId, date) => {
  try {
    const milkman = await Milkman.findById(milkmanId);

    // Find the subscription for the specified customer and date
    const subscription = milkman.subscribedCustomers.find(
      (sub) => sub.customer.equals(customerId) && sub.startDate.toISOString().split('T')[0] === date
    );

    if (!subscription) {
      throw new Error('Subscription not found for the specified customer and date');
    }

    // Mark the delivery as delivered
    subscription.delivered = true;

    // Save the changes
    await milkman.save();

    return { success: true, message: 'Delivery marked as delivered' };
  } catch (error) {
    console.error('Error marking delivery:', error.message);
    throw error; // Propagate the error to the controller or route
  }
};

module.exports = {
  markDelivered,
};
