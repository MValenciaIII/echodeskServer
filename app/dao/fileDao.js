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

  uploadFiles(req, res){
    // debugger;
    if (!req.file) {
      console.log('No file upload');
    } else {
      var imgsrc = 'http://localhost:4000/' + req.file.filename;
      console.log({imgsrc})
      console.log(req.body);
      console.log(req.body.ticket_id);
      var insertData = `INSERT INTO files SET file_name = ?, ticket_id = ?`;
      this.pool.query(insertData, [imgsrc, req.body.ticket_id], (err, result) => {
        if (err) throw err;
        console.log('file uploaded');
        res.send({
          "code": 200,
          "success": "file uploaded successfully."
      })
      });
    }
    console.log(req.body)
  }


  updateById(req, res) {
    let fields = Object.keys(req.body); // making dynamic. fields is now an array
    // fields[fields.indexOf('condition')] = 'condition'; //if i were using my cars database (for condition because condition is a reserve word in sql) : at position in the array, make equal to backtick array
    let values = Object.values(req.body); //making dynmical
  
    if (!req.params.ticket_id) {
        res.json({
            error: true,
            message: "Missing ID",
        });
    } else if (fields.length == 0) {
        res.json({
            error: true,
            message: "No fields to update",
        });
    }
  
    let sql = `UPDATE files set ${fields.join("=?,")}=? WHERE ticket_id =?`; //update the data!
    //have to put =? at the end of the join because join only add between things!
    console.log(sql);
  
    this.pool.query(sql, [...values, req.params.ticket_id], (err, rows) => {
        //... means SPREAD. It takes values from of array (in this instance).
        //did this method because, cant send id in body of values. if we didnt use params, then id would have to be passed in last. sent id as a "url param" and that seperated id for the body content.
  
        if (err) {
            res.json({
                error: true,
                message: err,
            });
        }
        res.json(rows);
    });
  } 
}
module.exports = FileDao;
