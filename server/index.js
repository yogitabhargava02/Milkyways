const express = require('express');
const app = express();
const PORT = 3000;
const milkmanRoutes = require('./routes/routes');
const milkmanLoginRoute = require('./routes/routes');
require("./config/database");


// ...
app.use(express.json());
app.use('/api/milkman', milkmanRoutes);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
