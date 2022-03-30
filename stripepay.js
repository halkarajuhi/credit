var express = require('express');
var router = express.Router();
const db = require('./dbConnection');

const stripe = require('stripe')('sk_test_51IFCZMCgALYZd2y9gmZqhmTIOcQYaWbR5JX7IDwhtpdVGueF7McgGw5Z07SJpxN34SDFhWq2LHOOpRbPQlB0430z00dIW4JhLY');
router.post('/pay', async (request, response) => {
    try {
      // Create the PaymentIntent
      let intent = await stripe.paymentIntents.create({
        payment_method_types: ['card'],
        payment_method: request.body.payment_method_id,
        description: "Test payment",
        amount: request.body.amount * 100,
        currency: 'inr',
        confirmation_method: 'manual',
        confirm: true
      });
      // Send the response to the client
      response.send(generateResponse(intent));
    } catch (e) {
      // Display error on client
      return response.send({ error: e.message });
    }
    
  });
   
  const generateResponse = (intent) => {
    
    if (intent.status === 'succeeded') {
      // The payment didn’t need any additional actions and completed!
      // Handle post-payment fulfillment
      return {
        success: true
      };
    } else {
      // Invalid status
      return {
        error: 'Invalid PaymentIntent status'
      };
    }
  };
   
  // request handlers
  router.get('/', (req, res) => {
    res.send('Stripe Integration! - Clue Mediator');
  });
  
  router.get('/getData', function (req, res) {
    console.log(req);
    db.query('select * from subscription_type', function (error, results, fields) {
     if (error) throw error;
     res.end(JSON.stringify(results));
   });
  });
  
  router.get('/edit/:id',(req, res) => {
    const id = req.params.id;
    let sql = `Select * from subscription_type where id = ${id}`;
    let query = db.query(sql,(err, result) => {
        if(err) throw err;
        res.end(JSON.stringify(result[0]));
    });
  });
  
  router.get('/usersubscripton/:id',(req, res) => {
    const id = req.params.id;
     let sql = `Select * from user_subscription where subscription_id = ${id}`;
    let query = db.query(sql,(err, result) => {
        if(err) throw err;
      
        res.end(JSON.stringify(result));
        console.log(result);

    });
  });

  module.exports = router;