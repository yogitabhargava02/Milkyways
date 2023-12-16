const Milkman = require('../../models/MilkmanSchema');

async function getSubscribedCustomers(milkmanId) {
  try {
    const milkman = await Milkman.findById(milkmanId).populate('subscribedCustomers');

    if (!milkman) {
      throw new Error('Milkman not found');
    }

    return { success: true, customers: milkman.subscribedCustomers };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Failed to fetch subscribed customers' };
  }
}

module.exports = {
  getSubscribedCustomers,
};
