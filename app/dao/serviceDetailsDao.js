const pool = require('../config/dbconfig');

class ServiceDetailsDao {
  //sometimes you have a parent dao class so its best to give the classes more define names.
  constructor() {
    this.pool = pool;
  }
  findAll(req, res) {
    // let sql = 'SELECT * FROM details';
    let sql = `SELECT d.id, d.details, s.service
    from service_details d
    join service s ON d.service_id = s.id ORDER BY d.id;`;
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
    // let sql = 'SELECT * FROM details where id= ?';
    let sql = `SELECT d.id, d.details, s.service
    from service_details d
    join service s ON d.service_id = s.id
    where d.id = ?;`;
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
}
module.exports = ServiceDetailsDao;