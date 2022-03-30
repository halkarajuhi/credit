const express = require('express');
const app = express();
var router = express.Router();





const stripe = require('stripe')('sk_test_RgC3iTPxF7mKGJUJcHvczLJZ');

router.post('/create_payment_intent', async (request, response) => {
  try{
    const intent = await stripe.paymentIntents.create({
      payment_method_types: ["alipay"],
      amount: 1099,
      currency: 'sgd',
       payment_method: request.body.payment_method_id
    });
   
    response.send({client_secret:intent.client_secret,id:intent.id});

  }
  catch(e){
    response.status(400).json({error: {message : e.message }});
  }

});

router.get('/secret',  (request, response) => {
  try {
    // Create the PaymentIntent
    
    console.log(intent)
    // Send the response to the client
    
    response.send({client_secret:intent});
    
  } catch (e) {
    // Display error on client
    return response.send({ error: e.message });
  }
});




  module.exports = router;
