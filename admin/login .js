const express = require('express')
const app = express();
const path = require('path');
const cors = require('cors');
const multer = require('multer');
var router = express.Router()
const db = require('../dbConnection');

router.post('/login', (req, res, next) => {
    let email = req.body.email;
    let password = req.body.password;


    db.query(
        `SELECT * FROM tbl_adminusers WHERE email = ${db.escape(req.body.email)};`,
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

          bcrypt.compare(password, result[0].password, function (err, result2) {
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

});                        
module.exports = router;