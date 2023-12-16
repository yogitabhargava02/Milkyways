const Customer = require('../../../models/CustomerSchema');
const Milkman = require('../../../models/MilkmanSchema');

async function subscribeCustomerToMilkman(customerId, milkmanId) {
  try {
  
    const customer = await Customer.findById(customerId);
    const milkman = await Milkman.findById(milkmanId);

    if (!customer || !milkman) {
      throw new Error('Customer or Milkman not found');
    }

    if (customer.subscribedMilkmen.includes(milkmanId)) {
      throw new Error('Customer is already subscribed to this Milkman');
    }

    customer.subscribedMilkmen.push(milkmanId);

    await customer.save();

    return { success: true, message: 'Subscription successful' };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Subscription failed' };
  }
}

module.exports = {
  subscribeCustomerToMilkman,
};
