const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT||3001;

app.use(express.json());
app.use(cors());
const milkmanRoutes = require('./routes/milkmanRoute');
const customerRoutes=require('./routes/customerRoute')
require("./config/database");



app.use('/api/milkman', milkmanRoutes);
app.use('/api/customer', customerRoutes);
app.get('/reset-password', (req, res) => {
   
    res.send('Reset Password Page'); // This can be your HTML page or template
  });
  
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

