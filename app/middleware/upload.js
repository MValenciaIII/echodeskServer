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
  limits: { fileSize: 1024 * 3 * 1000 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/gif" || file.mimetype == "image/png") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg, .gif, and .jpeg format allowed!'));
    }
  }
})

module.exports = upload;