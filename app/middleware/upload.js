// const express = require('express');
// const app = express();
const publicDir = require('../../multerConfig')
const multer = require('multer');
const path = require('path');
// debugger


// Use of Multer
var storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, publicDir); // './public/images/' directory name where save the file
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