const pool = require('../config/dbconfig');

class UserDao {
  constructor() {
    this.pool = pool;
  }


  findAll(req, res) {
    let sql = `SELECT c.id, c.fname, c.lname, c.email, c.mobile_phone, c.office_phone, c.title, d.department, l.location
    from clients c
    join departments d ON c.department_id = d.id
    join location l ON c.location_id = l.id ORDER BY c.id;`
    this.pool.query(sql, function (err, rows) {
      if (err) {
        res.json({
          error: true,
          message: err,
        });
      }
      res.json(rows);
    });
  }



  findbyID(req, res, id) {
    let sql = `SELECT c.id, c.fname, c.lname, c.email, c.mobile_phone, c.office_phone, c.title, d.department, l.location
    from clients c
    join departments d ON c.department_id = d.id
    join location l ON c.location_id = l.id
    where c.id = ?;`;
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

  
  create(req, res) {
    let fields = Object.keys(req.body);
    let values = Object.values(req.body);
    if (
      !req.body.fname ||
      !req.body.lname ||
      !req.body.email ||
      !req.body.mobile_phone ||
      !req.body.office_phone ||
      !req.body.location ||
      !req.body.title ||
      !req.body.department_id ||
      !req.body.id || 
      !req.body.isAdmin
    ) {
      res.json({
        error: true,
        message: 'ERROR! There is missing data in this form!',
      });
    }
    let sql = `INSERT INTO clients(${fields.join(',')})VALUES(${Array(
      values.length
    )
      .fill('?')
      .join(',')});`;
    this.pool.query(
      sql,
      values, //req.body.title, req.body.year, req.body.director_id, req.body.genre_id
      (err, rows) => {
        if (err) {
          res.json({
            error: true,
            message: err,
          });
        }
        res.json(rows);
      }
    );
  }
//UPDATE USER BY ID
  updateById(req, res) {
    let fields = Object.keys(req.body); 
    let values = Object.values(req.body); 
  
    if (!req.params.id) {
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
  
    let sql = `UPDATE clients set ${fields.join("=?,")}=? WHERE id =?`; //update the data!
    //have to put =? at the end of the join because join only add between things!
    console.log(sql);
  
    this.pool.query(sql, [...values, req.params.id], (err, rows) => {
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
module.exports = UserDao;
