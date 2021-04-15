const express = require('express');
const app = express();
const multer = require('multer');
const path = require('path');

//use express static folder
var publicDir = require('path').join(__dirname, './public/Images/');
app.use(express.static(publicDir));
const DIR = './public/Images/';


// Use of Multer
var storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, DIR); // './public/images/' directory name where save the file
  },
  filename: (req, file, callBack) => {
    callBack(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    );
  }
});
var upload = multer({
  storage: storage,
})

module.exports = upload;