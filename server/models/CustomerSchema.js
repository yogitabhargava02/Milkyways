const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
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
      enum: ['Point'],
    },
    coordinates: [Number],
},
}, { collection: 'customer' });

// Index the 'location' field for geospatial queries (if you store location data).
customerSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Customer', customerSchema);
