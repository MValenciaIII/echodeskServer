const daoClass = require('../../dao/quickFilterDao'); //dao needs to be in APP FOLDER
const dao = new daoClass();

// const pool = require('../../config/dbconfig');
const express = require('express');
const router = express.Router();

//root route: /api/tickets/ - the last '/' is what the '/' is referring too. everything before it is already pre-fixed.


router.get('/find?', async (req, res) => {
  // console.log(req.body);
  dao.quickFilters(req, res);
});


router.post('/update/:id', async (req, res) => {
  console.log(req.body);

  //res.json(req.body);
  dao.updateById(req, res);
});
module.exports = router;