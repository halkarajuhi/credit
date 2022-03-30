const express = require('express')
var router = express.Router();
const db = require('./dbConnection');

router.post("/addchat", (req, res) => {
    let data = {message: req.body.message,sender_id :req.body.userid,recriver_id:1 };
   
    let sql = "INSERT INTO cradochat SET ?";
    let query = db.query(sql, data, (err, result) => {
      if (err) throw err;
       res.send(JSON.stringify({ response : result.insertId ,success:true}));
   });
  });
  router.get('/getsingledata/:id', (req, res) => {
    const user_id = req.params.id;

    let sql = ` Select  *,DATE_FORMAT(date_time,'%h:%i %p') AS new_date,DAYNAME(date_time) as new_day from cradochat  where sender_id = ${user_id} or recriver_id = ${user_id}  order by chat_id asc` ;
  
    let query = db.query(sql, (err, result) => {
      if (err) throw err;
    
      res.end(JSON.stringify({response : result}));
    });
  });

  router.get('/showcount/:id', (req, res) => {
    const user_id = req.params.id;
    let sql = `SELECT count(*)  as total_unread FROM cradochat WHERE recriver_id = 1 and sender_id = ${user_id} and user_read = 0` ;
  
    let query = db.query(sql, (err, result) => {
      if (err) throw err;
    
      res.end(JSON.stringify({response : result[0]}));
    });
  });

  router.put("/updateCount/:userid", (req, res) => {
   
    var id = req.params.userid;

   var query = db.query(`UPDATE cradochat set  user_read = 1 where sender_id = ${id}`, function (err, result) {
      //    res.end(JSON.stringify(result));
      if (err) throw err;
        res.send(JSON.stringify({ status: 200, error: null, response: result }));
  
      });
  });

 
  module.exports = router;
