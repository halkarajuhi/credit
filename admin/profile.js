const express = require('express')
const app = express();
const path = require('path');
const cors = require('cors');
const multer = require('multer');
var router = express.Router();


const db = require('../dbConnection');




router.get('/profile_detail/:id', (req, res) => {
  const user_id = req.params.id;
  let sql = `Select * from tbl_adminusers where  userid = ${user_id}`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    res.end(JSON.stringify(result[0]));
  });
});

router.put("/update_profile_detail/:userid", (req, res) => {
  const firstname = req.body.firstname;
  
  const mobile_no = req.body.phone;
  const email = req.body.email;
 
  var id = req.params.userid;


   var query = db.query('UPDATE tbl_adminusers set   firstname = ? ,phone = ?,email = ?  where userid = ?', [firstname,mobile_no,email,id], function (err, result) {
    //    res.end(JSON.stringify(result));
    if (err) throw err;
    
    res.send(JSON.stringify({ status: 200, error: null, response: result }));
 });

});


const storage = multer.diskStorage({
  destination: path.join(__dirname, './admin/', 'uploads'),
  filename: function (req, file, cb) {
    // null as first argument means no error
    cb(null, Date.now()+ '-'+ file.originalname )
  }
})

router.put('/imageupload/:userid', async (req, res) => {
  var id = req.params.userid;
  console.log(id)
  try {
    // 'avatar' is the name of our file input field in the HTML form

    let upload = multer({ storage: storage }).single('avatar');

    upload(req, res, function (err) {
      // req.file contains information of uploaded file
      // req.body contains information of text fields

      if (!req.file) {
        return res.send('Please select an image to upload');
      }
      else if (err instanceof multer.MulterError) {
        return res.send(err);
      }
      else if (err) {
        return res.send(err);
      }
      const img_src = "http://localhost:5000/uploads1/"+req.file.filename
   
      db.query('UPDATE tbl_adminusers set   profile_pic = ?  where userid = ?', [img_src, id], function (err, result) {
        //    res.end(JSON.stringify(result));
      
        if (err) throw err;

        return res.send(JSON.stringify({ status: 200, error: false, profile_pic: img_src  }));
       
      });

    });

  } catch (err) { console.log(err) }
})







module.exports = router;