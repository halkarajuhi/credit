var express = require('express');
var router = express.Router();
const db = require('./dbConnection');
require('isomorphic-fetch')

////Recaptcha
router.post('/subscribe', async (req, res) => {

    if (!req.body.humankey)
      return res.json({ success: false, msg: 'Please select captcha' });
  
    // Secret key
    const secretKey = '6Lc47T0dAAAAADHxviZhk1245yWHXDUJJ82btXCN';
  
    // Verify URL
    const query = JSON.stringify({
      secret: secretKey,
      response: req.body.humankey
  
    });
  const isHuman = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
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
console.log(isHuman)
  if(req.body.humankey == null || !isHuman){
    return res.json({ success: false, msg: 'Failed captcha verification' });
  }else{
    return res.json({ success: true, msg: 'captcha verification done' });
  }
});
  
  module.exports = router;