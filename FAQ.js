var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('./dbConnection');

router.post("/addfaq", (req, res) => {
    let data = {question: req.body.faq_question,question_type: req.body.question_type ,answer: req.body.faq_answer};
    let sql = "INSERT INTO tbl_faq SET ?";
    let query = db.query(sql, data, (err, result) => {
      if (err) throw err;
       res.send(JSON.stringify({ response : result.insertId ,success:true}));
   });
  });
  router.get('/getalldata', (req, res) => {
  
    let sql = `Select * from tbl_faq`;
    let query = db.query(sql, (err, result) => {
      if (err) throw err;
      res.end(JSON.stringify({response : result}));
    });
  });

  router.get('/getallfaqdata', (req, res) => {
  
    let sql = 'Select * from question_type';
    let query = db.query(sql, (err, result) => {
      if (err) throw err;
      res.end(JSON.stringify({response : result}));
    });
  });

   router.get('/getsingledata/:id', (req, res) => {
    const user_id = req.params.id;
    let sql = `Select * from tbl_faq  where id = ${user_id}`;
    let query = db.query(sql, (err, result) => {
      if (err) throw err;
      res.end(JSON.stringify({response : result[0]}));
    });
  });

  router.put("/updatefaq/:userid", (req, res) => {
  const question = req.body.question;
  const answer = req.body.answer;
  const question_type = req.body.question_type;
  
  var id = req.params.userid;
 var query = db.query('UPDATE tbl_faq set   question = ? ,question_type = ? ,answer = ?   where id = ?', [question , question_type , answer,id], function (err, result) {
    //    res.end(JSON.stringify(result));
    if (err) throw err;
      res.send(JSON.stringify({ status: 200, error: null, response: result ,success:true}));

    });
});

router.delete('/deletefaq/:id', (req, res) => {
  const user_id = req.params.id;

  var sql = `DELETE FROM tbl_faq WHERE id = ${user_id}`;
  db.query(sql, function (err, result) {
    if (err) throw err;
      res.send(JSON.stringify({ status: 200, error: null, response: result.affectedRows }));
  
  });
});

  module.exports = router;