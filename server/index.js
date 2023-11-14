const express = require('express');
const app = express();
const PORT = 3000;
const milkmanRoutes = require('./routes/routes');
const customerRoutes=require('./routes/customerRoute')
require("./config/database");


// ...
app.use(express.json());
app.use('/api/milkman', milkmanRoutes);
app.use('/api/customer', customerRoutes);
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});


// const express = require('express');
// const NodeGeocoder = require('node-geocoder');

// const app = express();
// const PORT = 3000;
// const geocoder = NodeGeocoder({
//   provider: 'openstreetmap',
// });

// app.get('/geocode', (req, res) => {
//   const address = 'Maruti Nagar, Bareli, Madhya Pradesh, India'; 
//   geocoder.geocode(address)
//     .then((data) => {
//       if (!data.length) {
//         return res.status(500).json({ error: 'Geocoding failed' });
//       }

//       const location = {
//         latitude: data[0].latitude,
//         longitude: data[0].longitude,
//       };
//       res.json(location);
//     })
//     .catch((err) => {
//       console.error('Geocoding failed:', err);
//       res.status(500).json({ error: 'Geocoding failed' });
//     });
// });

// app.listen(PORT, () => {
//   console.log(`Server is listening on port ${PORT}`);
// });
