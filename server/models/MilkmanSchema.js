const mongoose = require('mongoose');

const milkmanSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
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
      default: 'Point',
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  profileImage: {
    type: String,
  },
  billingInfo: {
    perDayCharge: {
      type: Number,
     
    },
   
  },
  availability: [
    {
      day: String,
      timeSlots: [String],
    }
  ],
  

  subscribedCustomers: [
    {
      customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
      },
      startDate: {
        type: Date,
        required: true,
      },
      Quantity: {
        type: Number,
        
      },
      

    },
  ],
  
 
  
}, { collection: 'milkman' });

milkmanSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Milkman', milkmanSchema);
