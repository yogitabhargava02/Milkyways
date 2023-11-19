const express = require('express');
const app = express();
const PORT = 3000;
const milkmanRoutes = require('./routes/milkmanRoute');
const customerRoutes=require('./routes/customerRoute')
require("./config/database");



app.use(express.json());
app.use('/api/milkman', milkmanRoutes);
app.use('/api/customer', customerRoutes);
app.get('/reset-password', (req, res) => {
    // Your logic for handling the reset password page
    res.send('Reset Password Page'); // This can be your HTML page or template
  });
  
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

