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
  location: {
    type: {
      type: String,
      default: 'Point', // Set the default value directly
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
}, { collection: 'milkman' });

milkmanSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Milkman', milkmanSchema);
