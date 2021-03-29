const daoClass = require('../../dao/ticketDao'); //dao needs to be in APP FOLDER
const dao = new daoClass();

// const pool = require('../../config/dbconfig');
const express = require('express');
const router = express.Router();
var query = require('url');
const mysql = require('mysql');
const pool = require('../../config/dbconfig');
//root route: /api/tickets/ - the last '/' is what the '/' is referring too. everything before it is already pre-fixed.

//ALL TICKETS ROUTES ->> /api/tickets/
router.get('/', async (req, res) => {
  dao.findAll(req, res);
});

//FIND BY ID ROUTES ->> /api/tickets/:id
router.get('/:client_id', async(req, res) => {
  console.log(req.body);
  dao.findbyID(req, res, req.params.client_id);
});




// router.get('/search', async(req, res) => {
//   console.log(req.body);
//   console.log(query)
//   let query = req.query
//   pool.query(
//   let sql = 'Select * from tickets';
//   if(query.location_id){
//     sql += 'Where location_id${query.location}'
//   }
//   )
// });


// router.get("/search", (req, res) => {
//   let query = req.query;
//   console.log(query);
//   pool.query(
//     `SELECT * from tickets;`,
//     (err, rows) => {
//       if (!err) {
//         res.send(JSON.stringify(rows));
//         console.log(rows);
//       } else {
//         console.log("Error", err);
//       }
//     }
//   );
// });

// router.get("/search/:agent_id/:location_id/:priority_id/:status_id/:service_id/:service_details_id", function (req, res) {
//   let sql = `SELECT * FROM tickets WHERE agent_id = ${req.params.agent_id} AND location_id= ${req.params.location_id} AND priority_id= ${req.params.priority_id} AND status_id= ${req.params.status_id} AND service_id= ${req.params.service_id} AND service_details_id= ${req.params.service_details_id}`;
//   let query = pool.query(sql, (err, results) => {
//       if (err) throw err;
//       res.send(results);
//   });
//   // dao.findbyID(req, res, req.params.client_id);
// });



// router.get("/search", function (req, res) {
//   let sql = `SELECT * FROM tickets WHERE agent_id = ${req.params.agent_id} AND location_id= ${req.params.location_id} AND priority_id= ${req.params.priority_id} AND status_id= ${req.params.status_id} AND service_id= ${req.params.service_id} AND service_details_id= ${req.params.service_details_id}`;
//   let query = pool.query(sql, (err, results) => {
//       if (err) throw err;
//       res.send(results);
//   });
//   // dao.findbyID(req, res, req.params.client_id);
// });


router.get('/search?', function(req, res, next) {
  var sql = "SELECT * from tickets ";
  const existingParams = ["agent_id", "location_id"].filter(field => req.query[field]);

  if (existingParams.length !==0) {
      sql += " WHERE ";
      sql += existingParams.query(field => `${field} = ?`).join(" AND ");
  }

  pool.query(
      sql,
      existingParams.query(field => req.query[field]),
      function (error, results, fields) {
          res.json({"status": 200, "error": null, "response": results});
      }
  );
});



// router.get('/search?', function(req, res, next) {
//   var agent = req.query.agent_id;
//   var location = req.query.location_id;
//   var sql = "SELECT * from users WHERE agent_id = ? AND location_id = ?"; 
//   pool.query(sql, [agent, location], function (error, results, fields) {
//       res.json({"status": 200, "error": null, "response": results});
//   });
// });


















router.post('/update/:id', (req, res) => {
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

// router.get('/:id/addFile', (req, res) => {
//   console.log(req.body);
//   dao.addFile(req, res, req.params.id);
// });
// router.get('/:id/getFiles', (req, res) => {
//   console.log(req.body);
//   dao.getFiles(req, res, req.params.id);
// });
router.get('/delete/:id', (req, res) => {
  console.log(req.body);
  //res.json(req.body);
  dao.deletebyID(req, res, req.params.id);
});
  
module.exports = router;
