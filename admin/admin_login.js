const express = require('express')
const app = express();
const path = require('path');
var router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../dbConnection');
const jwt = require('jsonwebtoken');


router.post('/login', (req, res, next) => {
    let email = req.body.email;
    let password = req.body.password;
  db.query(
        `SELECT * FROM tbl_adminusers WHERE email = ${db.escape(req.body.email)};`,
        (err, result) => {
            // user does not exists
            if (err) {
                return  res.send(JSON.stringify({ status: 200,  error_msg: 'some thing went wrong',  success: "false" }));
            }

            if (!result.length) {
                return  res.send(JSON.stringify({ status: 200,  error_msg: 'Email is incorrect!',  success: "false" }));
            }

            bcrypt.compare(password, result[0].password, function (err, result2) {
                if (err) { throw (err); }

               if (result2 == true) {
                const theToken = jwt.sign({ id: result[0].user_id }, 'the-super-strong-secrect', { expiresIn: '1h' });

                    return res.json({
                        token: theToken,
                        user_id: result[0].userid,
                        email: result[0].email,
                        firstname: result[0].firstname,
                        lastname: result[0].lastname,
                        mobile_no: result[0].mobile_no,
                        error_msg: "Login Successfully",
                        success: "true"
                    });

                } else {
                    return  res.send(JSON.stringify({ status: 200,  error_msg: 'password is incorrect!',  success: "false" }));
                  
                }
            });
        });
});

router.put("/resetPassword/:email", (req, res) => {

    const newemail = req.params.email;
    console.log(newemail)
    let sql = 'Select * from tbl_adminusers where email ="' + newemail + '"';
  
    let query = db.query(sql, (err, result) => {
      if (err) throw err;
      const password = result[0].password;
  
      const updatedPassword = req.body.updated_password
      const currentPassword = req.body.current_password
      const hash = password
  
      bcrypt.compare(currentPassword, hash, function (err, isMatch) {
        if (err) {
          throw err
        } else if (!isMatch) {
  
          res.send(JSON.stringify({ status: 401, error: true, msg: "Password doesnt match" }));
        } else {
          const passwordHash = bcrypt.hashSync(updatedPassword, 10);
  
          db.query('UPDATE tbl_adminusers set   password = ?   where email = ?', [passwordHash, newemail], function (err, res1) {
             if (err) throw err;
            res.send(JSON.stringify({ status: 200, error: false, msg: "Password  updated Succesfully!" }));
  
          });
        }
      })
    });
    console.log(query.sql)
  
  })

router.put("/updatePassword/:encryptedData", (req, res) => {
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    var encryptedid = req.params.encryptedData;
    const passwordHash = bcrypt.hashSync(password, 10);
    let sql = 'Select * from registration where encryptedData ="' + encryptedid + '"';
    let query = db.query(sql, (err, result) => {
      if (err) throw err;
  
  
      if (result != '') {
        var newemail = result[0]['email'];
        const hashid = encrypt(newemail);
        const encryptedvalue = hashid.encryptedData;
  
        const querya1 = db.query('UPDATE registration set password = ? ,  encryptedData = ? where email = ?', [passwordHash, encryptedvalue, newemail], function (err, result2) {
  
          if (err) throw err;
          
          res.send(JSON.stringify({ status: 200, success: true, response: result2 }));
        });
     }
      else {
        res.send(JSON.stringify({ status: 500, success: false, message: "This Link is expired please use new link" }));
  
      }
  
    });
   });




module.exports = router;