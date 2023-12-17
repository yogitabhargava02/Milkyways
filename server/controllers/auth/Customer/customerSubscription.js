const Customer = require('../../../models/CustomerSchema');
const Milkman = require('../../../models/MilkmanSchema');

async function subscribeCustomerToMilkman(customerId, milkmanId, startDate) {
  try {
  
    const customer = await Customer.findById(customerId);
    const milkman = await Milkman.findById(milkmanId);

    if (!customer || !milkman) {
      throw new Error('Customer or Milkman not found');
    }

    if (customer.subscribedMilkmen.includes(milkmanId)) {
      throw new Error('Customer is already subscribed to this Milkman');
    }

    customer.subscribedMilkmen.push({ milkmanId, startDate });

    await customer.save();

    milkman.subscribedCustomers.push({ customer: customerId, startDate });


    await milkman.save();
console.log(customerId);

    return { success: true, message: 'Subscription successful' };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Subscription failed' };
  }
}

module.exports = {
  subscribeCustomerToMilkman,
};
