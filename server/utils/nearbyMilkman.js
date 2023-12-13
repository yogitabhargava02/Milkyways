const Customer = require('./models/Customer');
const Milkman = require('./models/Milkman');

// Assume customerLocation is the customer's location
const customerLocation = {
  type: 'Point',
  coordinates: [customerLongitude, customerLatitude],
};

// Query milkmen within 5 km
const nearbyMilkmen = await Milkman.find({
  location: {
    $near: {
      $geometry: customerLocation,
      $maxDistance: 5000, // in meters (5 km)
    },
  },
});
