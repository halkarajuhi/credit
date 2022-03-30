var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('./dbConnection');



router.post("/adddata", (req, res) => {
    let data = {about_page: req.body.content};
   
    let sql = "INSERT INTO aboutus SET ?";
    let query = db.query(sql, data, (err, result) => {
      if (err) throw err;
       res.send(JSON.stringify({ response : result.insertId ,success:false}));
   });
  });

  router.get('/getsingledata/:id', (req, res) => {
    const user_id = req.params.id;
    let sql = `Select * from aboutus  where id = ${user_id}`;
    let query = db.query(sql, (err, result) => {
      if (err) throw err;
      res.end(JSON.stringify({response : result[0]}));
    });
  });
  
  router.get('/alldata', (req, res) => {
    const user_id = req.params.id;
    let sql = `Select * from aboutus  where id = ${user_id}`;
    let query = db.query(sql, (err, result) => {
      if (err) throw err;
      res.end(JSON.stringify({response : result[0]}));
    });
  });

  router.put("/updatedata/:userid", (req, res) => {
    const content =  req.body.content;
 var id = req.params.userid;
   var query = db.query('UPDATE aboutus set   about_page = ?   where id = ?', [content,id], function (err, result) {
      //    res.end(JSON.stringify(result));
      if (err) throw err;
        res.send(JSON.stringify({ status: 200, error: null, response: result }));
  
      });
  });



module.exports = router;