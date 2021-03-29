const daoClass = require('../../dao/serviceDao'); //dao needs to be in APP FOLDER
const dao = new daoClass();

const express = require('express');
const router = express.Router();

//root route: /api/tickets/ - the last '/' is what the '/' is referring too. everything before it is already pre-fixed.

//ALL TICKETS ROUTES ->> /api/tickets/
router.get('/', (req, res) => {
  dao.findAll(req, res);
});
//FIND BY ID ROUTES ->> /api/tickets/:id
router.get('/:id', (req, res) => {
  dao.findbyID(req, res, req.params.id);
});

router.post('/update/:id', (req, res) => {
  console.log(req.body);

  //res.json(req.body);
  dao.updateById(req, res);
});

// /api/movies/create
router.post('/create', (req, res) => {
  console.log(req.body);

  //res.json(req.body);
  dao.createById(req, res);
});

router.get('/delete/:id', (req, res) => {
  console.log(req.body);

  //res.json(req.body);
  dao.deletebyID(req, res, req.params.id);
});

module.exports = router;
