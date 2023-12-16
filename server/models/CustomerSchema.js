const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  location: {
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
  subscribedMilkmen: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Milkman',
    },
  ],
}, { collection: 'customer' });

customerSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Customer', customerSchema);
