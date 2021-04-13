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

app.use(cors());

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
app.listen(PORT, () => {
  console.log(`Server on PORT: ${PORT}`);
});

//const PORT = 80;
// app.listen(PORT, () => {
  // console.log(`Server on PORT: ${PORT}`);//
//});


//ALL ROUTES

app.get('/', (req, res) => {
res.json({ 
 'All tickets': 'https://mema4kids.info/api/tickets', 
 'Find by priority': 'https://mema4kids.info/api/priority',
 'Find by status': 'https://mema4kids.info/api/status',
 'Find by departments': 'https://mema4kids.info/api/departments',
 'Find by details': 'https://mema4kids.info/api/details',
 'Find by service': 'https://mema4kids.info/api/service',
 'Find by location': 'https://mema4kids.info/api/location',
})
});


app.use('/api', router); //this entire system only exist after /api. pre-fixed with
