const mongoose = require('mongoose');

const milkmanSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobileNumber: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  milkInfo: {
    type: String,
  },
  profileImage: {
    type: String, // Store the path or URL to the image
  },
  deliveryTime: {
    type: String,
  },
  
  location: {
    type: {
      type: String,
      enum: ['Point'],
    },
    coordinates: [Number],
  },
}, { collection: 'milkman' });

milkmanSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Milkman', milkmanSchema);
