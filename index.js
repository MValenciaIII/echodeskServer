<<<<<<< HEAD
const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const mysql = require('mysql')
const multer = require('multer')
const path = require('path')
=======
const express = require('express');
const app = express();
>>>>>>> 0fadd69583d010dfa6c0cf9c4ab798dc6bb57a88
const cors = require('cors'); //gives us access to cors. Cors handles the http for us.
const router = require('./app/routes/router');
const path = require('path');
app.use(express.json());
app.use(express.urlencoded({ extended: true,}));
app.use(cors());

<<<<<<< HEAD
app.use(function(req,res, next){
 // res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
//  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Database connection
const db = mysql.createConnection({
    host: "localhost",
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
// Use of Multer
var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
    callBack(null, './public/Images')     // './public/images/' directory name where save the file
    },
   filename: (req, file, callBack) => {
       callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
   }})
var upload = multer({
    storage: storage
});
//! Routes start

router.post("/post", upload.single('file'), (req, res) => {
    if (!req.file) {
      console.log("No file upload");
   } else {
        console.log(req.file.filename)
        var imgsrc = 'https://mema4kids.info/' + req.file.filename
        var insertData = "INSERT INTO files(file_name, ticket_id)VALUES(?, ?)"
        db.query(insertData, [imgsrc, req.body.ticket_id], (err, result) => {
            if (err) throw err
           res.send('File successfully uploaded.')
           console.log("file uploaded")
        })
    }
}); 

const PORT = 4000; //? Any connection to the react port of 3000 for local hos
=======
const PORT = 4000; // Any connection to the react port of 4000 for local host
>>>>>>> 0fadd69583d010dfa6c0cf9c4ab798dc6bb57a88
app.listen(PORT, () => {
  console.log(`Server on PORT: ${PORT}`);
});

<<<<<<< HEAD
//const PORT = 80;
// app.listen(PORT, () => {
  // console.log(`Server on PORT: ${PORT}`);//
//});


=======
>>>>>>> 0fadd69583d010dfa6c0cf9c4ab798dc6bb57a88
//ALL ROUTES
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/404.html'))
  // res.json({
  //   // 'All tickets': 'http://localhost:4000/api/tickets',
  //   // 'Find by priority': 'http://localhost:4000/api/priority',
  //   // 'Find by status': 'http://localhost:4000/api/status',
  //   // 'Find by departments': 'http://localhost:4000/api/departments',
  //   // 'Find by details': 'http://localhost:4000/api/details',
  //   // 'Find by service': 'http://localhost:4000/api/service',
  //   // 'Find by location': 'http://localhost:4000/api/location',
  // });
});

app.use('/api', router); //this entire system only exist after /api. system becomes pre-fixed.


