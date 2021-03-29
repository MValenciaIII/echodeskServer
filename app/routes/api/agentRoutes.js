const daoClass = require('../../dao/agentDao'); //dao needs to be in APP FOLDER
const dao = new daoClass();
const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
  dao.findAll(req, res);
});

router.get('/:id', (req, res) => {
  dao.findbyID(req, res, req.params.id);
});
router.post("/update/:id", (req, res) => {
console.log(req.body);
//res.json(req.body);
dao.updateById(req, res);
});
// /api/movies/create
router.post('/create', (req, res) => {
  console.log(req.body);
  //res.json(req.body);
  dao.create(req, res);
});

router.post('/update/:id', (req, res) => {
    console.log(req.body);
    //res.json(req.body);
    dao.updateById(req, res);
});


module.exports = router;
