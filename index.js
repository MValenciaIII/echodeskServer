const express = require('express');
const app = express();
const cors = require('cors'); //gives us access to cors. Cors handles the http for us.
const router = require('./app/routes/router');
const path = require('path');
app.use(express.json());
app.use(express.urlencoded({ extended: true,}));
app.use(cors());

const PORT = 4000; // Any connection to the react port of 4000 for local host
app.listen(PORT, () => {
  console.log(`Server on PORT: ${PORT}`);
});

//ALL ROUTES
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'))
});

app.use('/api', router); //this entire system only exist after /api. system becomes pre-fixed.


