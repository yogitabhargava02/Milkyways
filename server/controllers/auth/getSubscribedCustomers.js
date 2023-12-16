const mongoose = require('mongoose');
const milkmanSchema = new mongoose.Schema({
  // ... (your existing code for MilkmanSchema)
}, { collection: 'milkman' });

milkmanSchema.index({ location: '2dsphere' });

milkmanSchema.statics.getSubscribedCustomers = async function (milkmanId) {
  try {
    const milkman = await this.findById(milkmanId).populate('subscribedCustomers');

    if (!milkman) {
      throw new Error('Milkman not found');
    }

    return { success: true, customers: milkman.subscribedCustomers };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Failed to fetch subscribed customers' };
  }
};

const Milkman = mongoose.model('Milkman', milkmanSchema);

module.exports = {
  getSubscribedCustomers: Milkman.getSubscribedCustomers,
};
