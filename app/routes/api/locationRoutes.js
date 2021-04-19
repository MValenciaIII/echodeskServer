const daoClass = require('../../dao/locationDao'); //dao needs to be in APP FOLDER
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
  dao.updateById(req, res);
});


module.exports = router;