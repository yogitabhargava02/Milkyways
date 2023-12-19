// services/billingService.js
const Milkman = require('../../models/MilkmanSchema');

const calculateBillForCustomer = async (milkmanId, customerId) => {
  try {
    const milkman = await Milkman.findById(milkmanId);

    // Find the subscription for the specified customer
    const subscription = milkman.subscribedCustomers.find((sub) => sub.customer.equals(customerId));

    if (!subscription) {
      throw new Error('Subscription not found for the specified customer');
    }

    // Access the perDayCharge from the milkman's billingInfo
    const perDayCharge = milkman.billingInfo.perDayCharge || 100; // Default to $10 if not provided

    // Retrieve the actual delivered days from the subscription
    const deliveredDays = subscription.deliveredDays || 10;

    // Calculate the total bill based on deliveredDays and perDayCharge
    const totalBill = deliveredDays * perDayCharge;

    return { success: true, totalBill };
  } catch (error) {
    console.error('Error calculating bill:', error.message);
    throw error; // Propagate the error to the controller or route
  }
};

module.exports = {
  calculateBillForCustomer,
};
