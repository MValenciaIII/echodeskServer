const daoClass = require('../../dao/filterDao'); //dao needs to be in APP FOLDER
const dao = new daoClass();
const express = require('express');
const router = express.Router();

router.get('/search?', async (req, res) => {
  console.log(req.body);
  dao.filterTickets(req, res);

});

router.post('/update/:id', (req, res) => {
  console.log(req.body);
  dao.updateById(req, res);
});

module.exports = router;
