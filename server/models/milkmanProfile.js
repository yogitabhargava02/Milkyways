const mongoose = require('mongoose');

const milkmanProfileSchema = new mongoose.Schema({
  // Reusing Common Fields
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  profileImage: {
    type: String, 
  },
 
  address: {
    type: String,
    required: true,
  },
  coordinates: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  city: {
    type: String,
    required: true,
  },
  dairyProductsOffered: [{
    type: String, // Assuming a list of dairy products offered
  }],
  deliverySchedule: {
    type: String, // Information about the milkman's delivery schedule
  },

  
}, { collection: 'milkman_profiles' });

milkmanProfileSchema.index({ coordinates: '2dsphere' });

module.exports = mongoose.model('MilkmanProfile', milkmanProfileSchema);
