var express = require('express');
var router = express.Router();

const db = require('../dbConnection');



router.post("/addreport", (req, res) => {
    let data = {heading: req.body.heading ,price: req.body.price};
   
    let sql = "INSERT INTO report SET ?";
    let query = db.query(sql, data, (err, result) => {
      if (err) throw err;
       res.send(JSON.stringify({ response : result.insertId ,success:true}));
   });
  });

  router.get('/getallreportdata', (req, res) => {
  
    let sql = 'Select * from report';
    let query = db.query(sql, (err, result) => {
      if (err) throw err;
      res.end(JSON.stringify({response : result,success:true}));
    });
  });

   router.get('/getsingledata/:id', (req, res) => {
    const user_id = req.params.id;
    let sql = `Select * from report  where id = ${user_id}`;
    let query = db.query(sql, (err, result) => {
      if (err) throw err;
      res.end(JSON.stringify({response : result[0]}));
    });
  });

  router.put("/updatereport/:userid", (req, res) => {
    const heading = req.body.heading;
    const price = req.body.price;
   var id = req.params.userid;
   var query = db.query('UPDATE report set  heading = ? ,price = ?  where id = ?', [heading , price,id], function (err, result) {
      //    res.end(JSON.stringify(result));
      if (err) throw err;
        res.send(JSON.stringify({ status: 200, error: null, response: result ,success:true}));
  
      });
  });
  
  router.delete('/deletereport/:id', (req, res) => {
    const user_id = req.params.id;
  
    var sql = `DELETE FROM report WHERE id = ${user_id}`;
    db.query(sql, function (err, result) {
      if (err) throw err;
        res.send(JSON.stringify({ status: 200, error: null, response: result.affectedRows }));
    
    });
  });

  module.exports = router;