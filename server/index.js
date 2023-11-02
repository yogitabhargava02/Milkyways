const express = require('express');
const app = express();
const PORT = 3000;
require('./config/database'); 

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
