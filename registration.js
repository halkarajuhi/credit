var express = require('express');
var router = express.Router();
const db = require('./dbConnection');
const nodemailer = require('nodemailer');
const { encrypt, decrypt } = require('./encryptdata');

router.post("/insertdata", (req, res) => {
  const email_individual = req.body.email_individual;
 

  const hashid = encrypt(email_individual);
  const encryptedvalue = hashid.encryptedData;

 
  db.query("SELECT COUNT(*) AS cnt FROM registration WHERE email = ? ",
    email_individual, function (err, data) {
      if (err) {
        console.log(err);
      }
      else {

        if (data[0].cnt > 0) {
          res.send(JSON.stringify({ success: false }));
        } else {
          let data = { firstname: req.body.firstname_individual, lastname: req.body.lastname_individual, salution: req.body.salution_individual, email: email_individual, address: req.body.address_individual, state: req.body.state_individual, telephone_no: req.body.telephone_no_individual, mobile_no: req.body.mobile_no_individual, country : req.body.country_individual , nationality: req.body.nationality_individual, industry: req.body.industry_individual, user_type: req.body.user_type_individual ,encryptedData : encryptedvalue};
          let sql = "INSERT INTO registration SET ?";

          let query = db.query(sql, data, (err, result) => {
            if (err) throw err;
            res.send(JSON.stringify({ success: true }));
            let id = result.insertId;

            // declare vars
            let fromMail = 'techdiligents@gmail.com';
            let toMail = req.body.email_individual;

            let subject = 'An email using nodejs app';
            let text = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book http://localhost:3000/password/" + encryptedvalue;

            // auth
            const transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                user: 'techdiligents@gmail.com',
                pass: 'techdiligents@$123amit',
              }
            });

            // email options
            let mailOptions = {
              from: fromMail,
              to: toMail,
              subject: subject,
              text: text
            };

            // send email
            transporter.sendMail(mailOptions, (error, response) => {
              if (error) {
                console.log(error);
              }
          
            });
          });
        }
      }

    });
});



// creat a new Record
router.post("/createdata", (req, res) => {

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
    const email = req.body.email;

    const hashid = encrypt(email);
    const encryptedvalue = hashid.encryptedData;

  

    db.query("SELECT COUNT(*) AS cnt FROM registration WHERE email = ? ",
      email, function (err, data) {
        if (err) {
          console.log(err);
        }
        else {

          if (data[0].cnt > 0) {
            res.send(JSON.stringify({ success: false }));
          } else {
            let data = { firstname: req.body.firstname, lastname: req.body.lastname, salution: req.body.salution, email: req.body.email, address: req.body.address, state: req.body.state, telephone_no: req.body.telephone_no, mobile_no: req.body.mobile_no, nationality: req.body.nationality, country : req.body.country , industry: req.body.industry, user_type: req.body.user_type, encryptedData: encryptedvalue };
            let sql = "INSERT INTO registration SET ?";
            let query = db.query(sql, data, (err, result) => {
              if (err) throw err;
              res.send(JSON.stringify({ success: true }));

              let id = result.insertId;

              // declare vars
              let fromMail = 'techdiligents@gmail.com';
              let toMail = req.body.email;

              let subject = 'An email using nodejs app';
              let text = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book http://localhost:3000/password/" + encryptedvalue;

              // auth
              const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: 'techdiligents@gmail.com',
                  pass: 'techdiligents@$123amit',
                }
              });

              // email options
              let mailOptions = {
                from: fromMail,
                to: toMail,
                subject: subject,
                text: text
              };

              // send email
              transporter.sendMail(mailOptions, (error, response) => {
                if (error) {
                  console.log(error);
                }
            
              });
            });

          }
        }
      })

  }
});

router.post("/subscriptiondata/:user_id", (req, res) => {

  var id = req.params.user_id;
  let sql = `Select COUNT(*) as total_count from user_subscription where 	user_id = ${id}`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    var userid_count = result[0].total_count;

    if (userid_count == 0) {
      let data = { user_id: req.body.user_id, subscription_id: req.body.subscription_id, subsription_type: req.body.subsription_type, amount: req.body.amount, credit_point: req.body.credit_point, start_date: req.body.start_date, end_date: req.body.end_date, status: req.body.status };
      let sql = "INSERT INTO user_subscription SET ?";

      let query = db.query(sql, data, (err, result1) => {
        if (err) throw err;
      
        res.send(JSON.stringify({ status: 200, error: null, response: result1 }));
      });
      
    } else {
     
      var user_id = req.body.user_id;
      var subscription_id = req.body.subscription_id;
      var subsription_type = req.body.subsription_type;
      var amount = req.body.amount;
      var credit_point = req.body.credit_point;
      var start_date = req.body.start_date;
      var end_date = req.body.end_date;
      var status = req.body.status;
      var query = db.query('UPDATE user_subscription set   user_id = ? ,subscription_id = ? ,subsription_type = ? ,amount = ?,credit_point = ?,start_date = ?,end_date = ?,status = ? where user_id = ?',
        [user_id, subscription_id, subsription_type, amount, credit_point, start_date, end_date, status, id], function (err, result2) {
          //    res.end(JSON.stringify(result));
          if (err) throw err;
       res.send(JSON.stringify({ status: 200, error: null, response: result2 }));

        });
    }
  });
});



router.get('/update_status/:userid', (req, res) => {

  const user_id = req.params.userid;
  

  let sql = `Select * from user_subscription where 	user_id = ${user_id}`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
  if(result != ''){
    subscription_id = result[0].subscription_id;
    let sql = `Select *,DATE_FORMAT(end_date, "%d/%m/%Y") AS formatted_end_date from user_subscription where 	subscription_id = ${subscription_id}`;
    let query1 = db.query(sql, (err, result2) => {
      if (err) throw err;
      userid = result2[0].user_id;
    
     
      db.query(`Select * from registration where user_id = ${userid}`, function (err, result1) {

        if (err) throw err;

        res.send(JSON.stringify({ status: 200, error: null, response: result[0] }));
        var newemail = result1[0].email;
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
          html: "<h3>Subscripied Succesfully</h3>"
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return console.log(error);
          }
         
        });

      });

    });

  }
    
  });
 
});


router.get('/subscription_type/:id', (req, res) => {
  const user_id = req.params.id;

  let sql = `Select * from subscription_type where 	id = ${user_id}`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    res.end(JSON.stringify(result[0]));
  });
});



module.exports = router;