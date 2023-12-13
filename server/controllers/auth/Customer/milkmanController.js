// milkmanController.js
const Milkman = require('../../../models/MilkmanSchema');

// milkmanController.js
async function getNearbyMilkmen(customerLocation, maxDistance) {
    try {
      console.log('Received Coordinates:', customerLocation);
      const nearbyMilkmen = await Milkman.find({
        location: {
          $near: {
            $geometry: customerLocation,
            $maxDistance: maxDistance,
          },
        },
      }).limit(10);
  
      console.log('Nearby Milkmen:', nearbyMilkmen);
      return nearbyMilkmen;
    } catch (error) {
      console.error('Error fetching nearby milkmen:', error);
      throw error;
    }
  }
  

module.exports = {
  getNearbyMilkmen,
};
