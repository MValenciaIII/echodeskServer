const pool = require('../config/dbconfig');

class FileDao {
  //sometimes you have a parent dao class so its best to give the classes more define names.
  constructor() {
    this.pool = pool;
  }
  findAll(req, res) {
    // let sql = "SELECT * FROM movies where deleted_at is NULL"; // simple statement unless you have a lot of joins.
    let sql = 'SELECT * FROM files';
    this.pool.query(sql, function (err, rows) {
      if (err) {
        res.json({
          //error and message suppose to look like: "error", "message". It works withou
          error: true,
          message: err,
        });
      }
      res.json(rows);
    });
  }
  findbyID(req, res, id) {
    let sql = 'SELECT * FROM files where ticket_id= ?';
    this.pool.query(sql, [id], function (err, rows) {
      if (err) {
        res.json({
          error: true,
          message: err,
        });
      }
      res.json(rows[0]);
    });
  }
  // create(req, res) {
  //   let fields = Object.keys(req.body);
  //   // fields[ fields.indexOf('condition')] = 'condition'; //if i were using my cars database
  //   let values = Object.values(req.body);
  //   //Required Min Data
  //   if (
  //     !req.body.file_name ||
  //     !req.body.ticket_id 
  //   ) {
  //     res.json({
  //       error: true,
  //       message: 'ERROR! There is missing data in this form!',
  //     });
  //   }
  // // var file = req.body.file_name;
  // //   if(file.mimetype == "image/jpeg" || file.mimetype == "image/png" || file.mimetype == "image/gif"){
  // //     file.mv('./app/Images/' + file.file_name, function(err){
  // //       if(err){
  // //         res.json({
  // //           error:true,
  // //           message: err,
  // //         });
  // //       }
  // //     })
  // //   }
  //   let sql = `INSERT INTO file(${fields.join(',')})VALUES(${Array(
  //     values.length
  //   )
  //     .fill('?')
  //     .join(',')});`;
  //   this.pool.query(
  //     sql,
  //     values, //req.body.title, req.body.year, req.body.director_id, req.body.genre_id
  //     (err, rows) => {
  //       if (err) {
  //         res.json({
  //           error: true,
  //           message: err,
  //         });
  //       }
  //       res.json(rows);
  //     }
  //   );
  // }
  // create(req, res) {

  //   if (!req.file_name) {
  //     console.log("No file upload");
  // } else {
  //     console.log(req.file.filename)
  //     var imgsrc = 'http://locahost:3095/api/files' + req.file_name.filename
  //     var insertData = "INSERT INTO files(file_name)VALUES(?)"
  //    pool.query(insertData, [imgsrc], (err, result) => {
  //         if (err) throw err
  //         console.log("file uploaded")
  //     })
  // }
  // let fields = Object.keys(req.body);
  // // fields[ fields.indexOf('condition')] = 'condition'; //if i were using my cars database
  // let values = Object.values(req.body);
  // if (
  //   !req.body.file_name
  // ) {
  //   res.json({
  //     error: true,
  //     message: 'ERROR! There is missing data in this form!',
  //   });
  // } else {
  //     console.log(req.body_file_name)
  //     // var imgsrc = 'http://localhost:3095/api/filess' + req.body.file_name

  //   var file = req.body.file_name;
  //   if(file.mimetype == "image/jpeg" || file.mimetype == "image/png" || file.mimetype == "image/gif"){
  //     file.mv('\server\Images' + file.file_name, function(err){
  //       if(err){
  //         res.json({
  //           error:true,
  //           message: err,
  //         });
  //       }
  //     })
  //   }
  //     let sql = `INSERT INTO files(${fields.join(',')})VALUES(${Array(
  //       values.length
  //     )
  //       .fill('?')
  //       .join(',')});`;
  //     this.pool.query(
  //       sql, 
  //       values, //req.body.title, req.body.year, req.body.director_id, req.body.genre_id
  //       (err, rows) => {
  //         if (err) {
  //           res.json({
  //             error: true,
  //             message: err,
  //           });
  //         }
  //         res.json(rows);
  //       }
  //     );
  //   }
// }



//   updateById(req, res) {
//     let fields = Object.keys(req.body); // making dynamic. fields is now an array
//     // fields[fields.indexOf('condition')] = 'condition'; //if i were using my cars database (for condition because condition is a reserve word in sql) : at position in the array, make equal to backtick array
//     let values = Object.values(req.body); //making dynmical
  
//     if (!req.params.id) {
//         res.json({
//             error: true,
//             message: "Missing ID",
//         });
//     } else if (fields.length == 0) {
//         res.json({
//             error: true,
//             message: "No fields to update",
//         });
//     }
  
//     let sql = `UPDATE clients set ${fields.join("=?,")}=? WHERE id =?`; //update the data!
//     //have to put =? at the end of the join because join only add between things!
//     console.log(sql);
  
//     this.pool.query(sql, [...values, req.params.id], (err, rows) => {
//         //... means SPREAD. It takes values from of array (in this instance).
//         //did this method because, cant send id in body of values. if we didnt use params, then id would have to be passed in last. sent id as a "url param" and that seperated id for the body content.
  
//         if (err) {
//             res.json({
//                 error: true,
//                 message: err,
//             });
//         }
//         res.json(rows);
//     });
//   } 
}
module.exports = FileDao;
