const pool = require('../config/dbconfig');
class FileDao {
  //sometimes you have a parent dao class so its best to give the classes more define names.
  constructor() {
    this.pool = pool;
  }
  findAll(req, res) {
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
    console.log('posting files from index.js');
    // if(file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/gif" || file.mimetype == "image/png"){
    //   file.mv('./public/Images/' + file.file_name, function(err){
    //     if(err){
    //       res.json({
    //         error:true,
    //         message: err,
    //       });
    //     }
    //   })
    // }
    const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];
    let filesArr = [...req.files];
    console.log(filesArr)
    let isValid = filesArr.every((file) => SUPPORTED_FORMATS.includes(file.mimetype))
    console.log('IsValid', isValid)
        if (!isValid) {
         return res.status(400).send({
            error: true,
            message: "Unsupported File Type.",
          })
        }
    if (!req.files) {
      console.log('No files upload');
    } else if (req.files.length > 3) {
      res.status(400).json({
        error: true,
        message: "Can't upload more than 3 files",
      })
    } else {
      let results = {
        fields: [],
        message: 'Files uploaded successfully',
      };
      req.files.forEach((file) => {
        var imgsrc = 'http://mema4kids.info/' + file.filename;
        var insertData = `INSERT INTO files SET file_name = ?, ticket_id = ?`;
        pool.query(insertData, [imgsrc, req.body.ticket_id], (err, result) => {
          if (err) {
            throw err;
          } else {
            results.fields.push(result);
          }
        });
      });
      return res.json(results);
    }
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
