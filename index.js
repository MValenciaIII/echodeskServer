const express = require('express');
const app = express();
const cors = require('cors'); //gives us access to cors. Cors handles the http for us.
const router = require('./app/routes/router');
const publicDir = require('./multerConfig');
app.use(express.json());
app.use(express.urlencoded({ extended: true,}));
app.use(cors());
app.use(express.static(publicDir));
// debugger;


const PORT = 4000; // Any connection to the react port of 4000 for local host
app.listen(PORT, () => {
  console.log(`Server on PORT: ${PORT}`);
});

//ALL ROUTES
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'))
  // res.json({
  //   'All tickets': 'http://localhost:4000/api/tickets',
  //   'Find by priority': 'http://localhost:4000/api/priority',
  //   'Find by status': 'http://localhost:4000/api/status',
  //   'Find by departments': 'http://localhost:4000/api/departments',
  //   'Find by details': 'http://localhost:4000/api/details',
  //   'Find by service': 'http://localhost:4000/api/service',
  //   'Find by location': 'http://localhost:4000/api/location',
  // });
});

app.use('/api', router); //this entire system only exist after /api. system becomes pre-fixed.


