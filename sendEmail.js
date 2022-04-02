var express = require('express');
var router = express.Router();
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const db = require('./dbConnection');
const jwt = require('jsonwebtoken');
const path = require("path");
var otp = "";



router.post("/emailsend", (req, res) => {

  otp = Math.random();
  otp = otp * 1000000;
  otp = parseInt(otp);

  db.query(
    `SELECT * FROM registration WHERE email = ${db.escape(req.body.email)};`,
    (err, result) => {
      // user does not exists
      if (err) {
        return res.send({
          error_msg: 'Something went wrong'
        });
      }

      if (!result.length) {
        return res.send(JSON.stringify({ status: 500, error: true, error_msg: 'Register first!' }));
      }else{
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
        email = req.body.email;
      
        // send mail with defined transport object
        var mailOptions = {
          to: req.body.email,
          subject: "Otp for registration is: ",
          html: "<h3>OTP for account verification is </h3>" + "<h1 style='font-weight:bold;'>" + otp + "</h1>" // html body
        };
      
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return console.log(error);

          }
         return res.send(JSON.stringify({ status: 200, error: false, error_msg: 'Otp Send Successfully' }));
        });

      }
    }) 
});


router.post('/verify', function (req, res) {
  console.log(req.body.otp);
  console.log(otp);
  if (req.body.otp == otp) {
    res.send("You has been successfully registered");
  }
  else {
    res.send('otp is incorrect');
  }
});

router.post('/resend', function (req, res) {
  var mailOptions = {
    to: email,
    subject: "Otp for registration is: ",
    html: "<h3>OTP for account verification is </h3>" + "<h1 style='font-weight:bold;'>" + otp + "</h1>" // html body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
   res.render('otp', { msg: "otp has been sent" });
  });

})

router.post('/login', (req, res, next) => {
  let email = req.body.email;
  let password = req.body.password;
  if (req.body.otp == otp) {

    db.query(
      `SELECT * FROM registration WHERE email = ${db.escape(req.body.email)};`,
      (err, result) => {
        // user does not exists
        if (err) {
          return res.send({
            error_msg: 'Something went wrong'
          });
        }

        if (!result.length) {
          return res.send({
            error_msg: 'Email is incorrect'
          });
        }

       
     
      bcrypt.compare(password, result[0].password, function(err, result2) {
        if (err) { throw (err); }
       
   
        if (result2 == true) {

          const theToken = jwt.sign({ id: result[0].user_id }, 'the-super-strong-secrect', { expiresIn: '1h' });

          return res.json({
            token: theToken,
            user_id: result[0].user_id,
            email: result[0].email,
            firstname: result[0].firstname,
            lastname: result[0].lastname,
            mobile_no: result[0].mobile_no,
            error_msg: ""
          });
        
        } else {
       return res.send({
            error_msg: 'password is incorrect!'
          });
           }
          });
           });
  }

  else {
    res.send({ error_msg: "otp  is not verifired" });
  }
});

router.post("/confirm_pass_emailsend", (req, res) => {
  

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
  email = req.body.email;

  // send mail with defined transport object
  var mailOptions = {
    to: req.body.email,
    subject: "Change Password Link ",
    html: "<h3>password change link  Send successfully</h3>" + "<h1 style='font-weight:bold;'>http://localhost:3000/Forgotpasslink</h1>" // html body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    res.send('otp send successfully');
  });
});

router.put('/confirm_pass_emailsend/:uniquekey',(req, res) => {
  const uniquekey = req.params.uniquekey;
  var email = req.body.email
  db.query('UPDATE registration set unique_key = ? where email = ?', [uniquekey,email], function (err, result) {
    //    res.end(JSON.stringify(result));
    if (err) throw err;
    res.send(JSON.stringify({ status: 200, error: null, response: result }));
  });
 
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
  email = req.body.email;

  // send mail with defined transport object
  var mailOptions = {
    to: req.body.email,
    subject: "Change Password Link ",
    html: "<h3>password change link  Send successfully</h3>" + "<h1 style='font-weight:bold;'>http://localhost:3000/forgot/"+uniquekey+ "</h1>" // html body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    res.send('change password link  send successfully');
  });



})

module.exports = router;
