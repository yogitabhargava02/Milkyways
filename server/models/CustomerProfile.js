const mongoose = require('mongoose');

const customerProfileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: String,
    required: true,
    unique: true,
  },
  billingInfo: {
    // Add fields specific to billing information
    type: String,
    // ... other billing-related fields
  },
}, { collection: 'customerProfiles' }); // You can change the collection name as needed

module.exports = mongoose.model('CustomerProfile', customerProfileSchema);
