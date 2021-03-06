const pool = require('../config/dbconfig');
                                         
class FilterDao {
  //sometimes you have a parent dao class so its best to give the classes more define names.
  constructor() {                                      
    this.pool = pool;
  }

 async filterTickets(req, res) {
    try {
      let {created_at, ...rest} = req.query;
      let createdAtSql='';
    console.log({rest})
      console.log({created_at})
      let fields=Object.keys(rest);
      console.log({fields})
      let values=Object.values(rest);
      console.log({values})
      let joined = fields.join('=? AND ');  //if only 1 field, no=? to join with;  if mutliples, appends;
      if (created_at) {
         created_at = created_at.replace('+', ' ');
         createdAtSql = `created_at >= DATE_SUB(NOW(), INTERVAL ${created_at})`;
        //  joined = fields.join('=? AND ')
        if (fields.length > 0) {
          joined = ' AND '.concat(`${fields.join('=? AND ')}=?`)
        }
      }
      let sql=`SELECT * from tickets WHERE ${createdAtSql.concat(joined)}`;
      console.log({sql})
      let tickets = await pool.query(sql, [...values]);
      // console.log(tickets);
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
    console.log({sql});
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

// console.log(FilterDao)
// FilterDao.prototype.filterTickets({test:"secondTest"}, 'res');

module.exports = FilterDao;
