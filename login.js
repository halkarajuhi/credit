var express = require('express');
var router = express.Router();
const path = require("path");
const fetch = require('node-fetch');
const { stringify } = require('querystring');
const bcrypt = require('bcryptjs');
const db = require('./dbConnection');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const { encrypt, decrypt } = require('./encryptdata');


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
        let transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: false,
          service: 'Gmail',

          auth: {
            user: 'techdiligents@gmail.com',
            pass: 'techdiligents@$123amit',
          }
       });
        email = newemail;
    // send mail with defined transport object
        var mailOptions = {
          to: newemail,
          subject: "Change Password Link ",
          html: "<h3>password changed  successfully</h3>"
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return console.log(error);
          }

        });
        res.send(JSON.stringify({ status: 200, success: true, response: result2 }));


        console.log(query.sql);

        console.log(querya1.sql);
      });



    }
    else {
      res.send(JSON.stringify({ status: 500, success: false, message: "This Link is expired please use new link" }));

    }

  });


});

router.put("/forgotPassword/:uniquekey", (req, res) => {
  var previouskey = req.params.previouskey;

  if (!req.body.humankey)
    return res.json({ success: false, msg: 'Please select captcha' });

  // Secret key
  const secretKey = '6Lc47T0dAAAAADHxviZhk1245yWHXDUJJ82btXCN';

  // Verify URL
  const query = JSON.stringify({
    secret: secretKey,
    response: req.body.humankey

  });
  const isHuman = fetch(`https://www.google.com/recaptcha/api/siteverify`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    },
    body: `secret=${secretKey}&response=${req.body.humankey}`

  })
    .then(res => (res.json()))
    .then(json => (json.success))
    .catch(err => { throw new Error(`Error in Google Siteverify API. ${err.message}`) })
  if (req.body.humankey == null || !isHuman) {
    return res.json({ success: false, msg: 'Failed captcha verification' });
  } else {
    const password = req.body.password;
    const email = req.body.email;
    const confirmPassword = req.body.confirmPassword;
    const passwordHash = bcrypt.hashSync(password, 10);
   
    db.query('UPDATE registration set   password = ?  ,unique_key = ? where email = ?', [passwordHash, previouskey, email], function (err, result) {
      //    res.end(JSON.stringify(result));
      if (err) throw err;
      res.send(JSON.stringify({ status: 200, error: null, response: result }));
    });
  }

});

// creat a new Record
router.post("/guestlogin", (req, res) => {
  let data = { firstname: req.body.firstname, lastname: req.body.lastname, salution: req.body.salution, email: req.body.email, address: req.body.address, state: req.body.state, telephone_no: req.body.telephone_no, mobile_no: req.body.mobile_no, nationality: req.body.nationality, industry: req.body.industry, user_type: req.body.user_type };
  let sql = "INSERT INTO registration SET ?";
  let query = db.query(sql, data, (err, result) => {
    if (err) throw err;
    res.send(JSON.stringify({ response: result.insertId }));

  });
});

router.put("/resetPassword/:email", (req, res) => {

  const newemail = req.params.email;
  let sql = 'Select * from registration where email ="' + newemail + '"';

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

        db.query('UPDATE registration set   password = ?   where email = ?', [passwordHash, newemail], function (err, res1) {

          if (err) throw err;
          let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: false,
            service: 'Gmail',

            auth: {
              user: 'techdiligents@gmail.com',
              pass: 'techdiligents@$123amit',
            }

          });
          email = newemail;

          // send mail with defined transport object
          var mailOptions = {
            to: email,
            subject: "Change Password Link ",
            html: "<h3>password changed  successfully</h3>"
          };

          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

            res.send('password changed  successfully');
          })

          res.send(JSON.stringify({ status: 200, error: false, msg: "Password  updated Succesfully!" }));

        });
      }
    })
  });

});




module.exports = router;
