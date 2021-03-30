const pool = require('../config/dbconfig');

class TicketDao {
  //sometimes you have a parent dao class so its best to give the classes more define names.
  constructor() {
    this.pool = pool;
  }
  async findAll(req, res) {
    try {
      let tickets = await pool.query('SELECT * FROM tickets');
      console.log(tickets);
      let files = await pool.query('Select * from files');
      let comments = await pool.query(`Select tn.id, tn.note_text, tn.client_id, tn.ticket_id, c.fname, c.lname, tn.created_at
      from ticket_notes tn
      join clients c ON tn.client_id = c.id `);
      let merged = tickets.map((ticket, idx) => {
        ticket.files = files.filter(file => file.ticket_id === ticket.id);
        ticket.notes = comments.filter(comment => comment.ticket_id === ticket.id)
        return ticket
      })
      res.json(merged);
  } catch (err) {
    throw new Error(err)
  } 
}
  async findbyID(req, res, client_id) {
    try {
      let tickets = await pool.query('SELECT * FROM tickets where client_id=?', [client_id]);
      console.log(tickets);
      let files = await pool.query('Select * from files');
      let comments = await pool.query(`Select tn.id, tn.note_text, tn.client_id, tn.ticket_id, c.fname, c.lname, tn.created_at
      from ticket_notes tn
      join clients c ON tn.client_id = c.id `);
      let merged = tickets.map((ticket, idx) => {
        ticket.files = files.filter(file => file.ticket_id === ticket.id);
        ticket.notes = comments.filter(comment => comment.ticket_id === ticket.id)
        return ticket
      })
      res.json(merged);
  } catch (err) {
    throw new Error(err)
  } 
  }

  create(req, res) {
    // let sql = "Makes routing more dynamic with a question mark";
    let fields = Object.keys(req.body);
    // fields[ fields.indexOf('condition')] = 'condition'; //if i were using my cars database
    let values = Object.values(req.body);
    //Required Min Data
    if (
      !req.body.client_full_name ||
      !req.body.client_id ||
      !req.body.client_phone_number ||
      !req.body.department_id ||
      !req.body.description ||
      !req.body.id || 
      !req.body.location_id ||
      !req.body.priority_id ||
      !req.body.service_details_id ||
      !req.body.service_id ||
      !req.body.status_id ||
      !req.body.subject
    ) {
     return res.json({
        error: true,
        message: 'ERROR! There is missing data in this form!',
      });
    }
    // res.json({ "here": "yo" });
    //dynamically. dont send in NULLS using this!
    let sql = `INSERT INTO tickets(${fields.join(',')})VALUES(${Array(
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
  updateById(req, res) {
    let fields = Object.keys(req.body); // making dynamic. fields is now an array
    // fields[fields.indexOf('condition')] = 'condition'; //if i were using my cars database (for condition because condition is a reserve word in sql) : at position in the array, make equal to backtick array
    let values = Object.values(req.body); //making dynmical

    if (!req.params.id) {
      res.json({
        error: true,
        message: 'Missing ID',
      });
    } else if (fields.length == 0) {
      res.json({
        error: true,
        message: 'No fields to update',
      });
    }
    let sql = `UPDATE tickets set ${fields.join('=?,')}=? WHERE id =?`; //update the data!
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
module.exports = TicketDao;
