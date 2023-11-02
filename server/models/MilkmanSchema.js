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
  // You can add more fields specific to milkmen's profiles, such as milk information, location, etc.
  milkInfo: {
    type: String,
  },
  // You may want to store the location of the milkman as well (e.g., latitude and longitude).
  location: {
    type: {
      type: String,
      enum: ['Point'],
    },
    coordinates: [Number],
},
}, { collection: 'milkman' });

// Index the 'location' field for geospatial queries (if you store location data).
milkmanSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Milkman', milkmanSchema);
