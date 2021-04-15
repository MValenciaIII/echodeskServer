const daoClass = require('../../dao/fileDao'); //dao needs to be in APP FOLDER
const dao = new daoClass();
const express = require('express');
const router = express.Router();
const upload = require('../../middleware/upload')


//GET ALL FILE ROUTES 
router.get('/', (req, res) => {
  dao.findAll(req, res);
});


//api/files/post
router.post('/post', upload.single('file'),  (req, res) => {
 dao.uploadFiles(req, res);
});

// FIND A FILE ROUTE BY ID
router.get('/:id', (req, res) => {
  dao.findbyID(req, res, req.params.id);
});


// //CREATE FILE ROUTE
// router.post('/create', (req, res) => {
//   console.log(req.body);
//   dao.create(req, res);
// });


// //UPDATE FILE ROUTE.
router.post("/update/:id", (req, res) => {
console.log(req.body);
dao.updateById(req, res);
});


module.exports = router;
