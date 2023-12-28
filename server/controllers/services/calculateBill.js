
const Milkman = require('../../models/MilkmanSchema');

const calculateBillForCustomer = async (milkmanId, customerId) => {
  try {
    const milkman = await Milkman.findById(milkmanId);

    const subscription = milkman.subscribedCustomers.find((sub) => sub.customer.equals(customerId));

    if (!subscription) {
      throw new Error('Subscription not found for the specified customer');
    }

    const perDayCharge = milkman.billingInfo.perDayCharge || 100; 

    
    const deliveredDays = subscription.deliveredDays || 10;

    
    const totalBill = deliveredDays * perDayCharge;

    return { success: true, totalBill };
  } catch (error) {
    console.error('Error calculating bill:', error.message);
    throw error;
  }
};

module.exports = {
  calculateBillForCustomer,
};
