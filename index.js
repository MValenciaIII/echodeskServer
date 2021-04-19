//Express is a framework that works with node.js to web applications. 
const express = require('express'); //declares a variable that will contain the module express, that is in the node_module folder. 
const app = express();
const cors = require('cors'); //gives us access to cors. Cors handles the http for us.
const router = require('./app/routes/router');
const publicDir = require('./multerConfig');
const path = require('path');
app.use(express.json());
app.use(express.urlencoded({ extended: true,})); //formly now as "body-parser. Body-parser is now depreciated and built into the express package."
app.use(cors());
app.use(express.static(publicDir));
// debugger;


const PORT = 4000; // Any connection to the react port of 4000 for localhost. 
app.listen(PORT, () => {
  console.log(`Server on PORT: ${PORT}`);
});

//ALL ROUTES
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html')) //tranfers a file at the given path.
});

app.use('/api', router); //this entire system only exist after /api. system becomes pre-fixed.


