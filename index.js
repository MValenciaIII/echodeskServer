const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const mysql = require('mysql')
const multer = require('multer')
const path = require('path')
const cors = require('cors'); //gives us access to cors. Cors handles the http for us.
const bodyParser = require('body-parser'); // allows us to parse
const router = require('./app/routes/router');
//use express static folder
var publicDir = require('path').join(__dirname,'./public/Images'); 
app.use(express.static(publicDir)); 
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({
    extended: true
}))
// Database connection
const db = mysql.createConnection({
    host: "10.195.103.107",
    user: "root",
    password: "memadev",
    database: "echodeskDev"
})
db.connect(function (err) {
    if (err) {
        return console.error('error: ' + err.message);
    }
    console.log('Connected to the MySQL server.');
})
//! Use of Multer
var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './public/Images')     // './public/images/' directory name where save the file
    },
    filename: (req, file, callBack) => {
        callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
var upload = multer({
    storage: storage
});
//! Routes start

//@type   GET
//$route  /
//@desc   route for Home page
//@access PUBLIC
router.get("/create", (req, res) => {
    // res.render('./index.html');
    res.sendFile(__dirname + "/index.html");
})

//@type   POST
//$route  /post
//@desc   route for post data
//@access PUBLIC
router.post("/post", upload.single('fileUpload'), (req, res) => {
    if (!req.file) {
        console.log("No file upload");
    } else {
        console.log(req.file.filename)
        var imgsrc = 'http://localhost:4000/' + req.file.filename
        var insertData = "INSERT INTO files(file_name)VALUES(?)"
        db.query(insertData, [imgsrc], (err, result) => {
            if (err) throw err
            console.log("file uploaded")
        })
    }
}); 

const PORT = 4000; //? Any connection to the react port of 3000 for local hos
app.listen(PORT, () => {
  console.log(`Server on PORT: ${PORT}`);
});


//ALL ROUTES
app.get('/', (req, res) => {
  res.json({
    'All tickets': 'http://localhost:4000/api/tickets',
    'Find by priority': 'http://localhost:4000/api/priority',
    'Find by status': 'http://localhost:4000/api/status',
    'Find by departments': 'http://localhost:4000/api/departments',
    'Find by details': 'http://localhost:4000/api/details',
    'Find by service': 'http://localhost:4000/api/service',
    'Find by location': 'http://localhost:4000/api/location',
  });
});


app.use('/api', router); //this entire system only exist after /api. pre-fixed with




































































// const express = require('express'); // gives us access to express
// const app = express(); //accentuate express into the server folder.

// const cors = require('cors'); //gives us access to cors. Cors handles the http for us.
// // const bodyParser = require('body-parser'); // allows us to parse
// const router = require('./app/routes/router');

// // as an api gets bigger (Scales), do you have a file system that can scale instead of a 1000 lines in one index.js. Router is a way to make the api more flexiable without people 1000 lines of code in one file.

// const PORT = 4000; //? Any connection to the react port of 3000 for local hos
// app.listen(PORT, () => {
//   console.log(`Server on PORT: ${PORT}`);
// });

// app.use(cors());
// // app.use(bodyParser.urlencoded({ extended: false }));
// // app.use(bodyParser.json()); //parse json package that is sent back to our api.
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// //ALL ROUTES
// app.get('/', (req, res) => {
//   res.json({
//     'All tickets': 'http://localhost:4000/api/tickets',
//     'Find by priority': 'http://localhost:4000/api/priority',
//     'Find by status': 'http://localhost:4000/api/status',
//     'Find by departments': 'http://localhost:4000/api/departments',
//     'Find by details': 'http://localhost:4000/api/details',
//     'Find by service': 'http://localhost:4000/api/service',
//     'Find by location': 'http://localhost:4000/api/location',
//   });
// });

// app.post('/update', (req, res) => {
//   console.log(req.body);
//   res.json(req.body);
// });

// app.post('/create', (req, res) => {
//   console.log(req.body);

//   res.json(req.body);
// });

// app.post('/delete/:id', (req, res) => {
//   console.log(req.body);

//   res.json(req.body);
// });

// app.use('/api', router); //this entire system only exist after /api. pre-fixed with
