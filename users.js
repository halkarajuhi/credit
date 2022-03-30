var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('./dbConnection');

router.get('/getall', (req, res) => {
  
    let sql = `Select * from registration`;
    let query = db.query(sql, (err, result) => {
      if (err) throw err;
      res.end(JSON.stringify({response : result}));
    });
  });

  router.put("/updatestatus/:id", (req, res) => {
    const user_id = req.params.id;
    const status = req.body.active;
    
    var id = req.params.userid;
   var query = db.query('UPDATE registration  set   status = ? where user_id = ?', [status,user_id], function (err, result) {
      //    res.end(JSON.stringify(result));
      if (err) throw err;
        res.send(JSON.stringify({ status: 200, error: null, response: result }));
  
      });
  });

  router.get('/getsingledata/:id', (req, res) => {
    const user_id = req.params.id;
    let sql = `Select * from registration  where user_id = ${user_id}`;
    let query = db.query(sql, (err, result) => {
      if (err) throw err;
      res.end(JSON.stringify({response : result[0]}));
    });
  });

  module.exports = router;