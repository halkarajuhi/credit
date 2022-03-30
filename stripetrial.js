const express = require("express");
const app = express();
var router = express.Router();
const db = require('./dbConnection');
const secretKey = "sk_test_RgC3iTPxF7mKGJUJcHvczLJZ";
console.log(secretKey);
const stripe = require("stripe")(secretKey);

// Add headers
router.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

router.get("/", async (req, res) => {
  res.json("Hello this is stripe setup server.");
});

router.post("/create-checkout-session", async (req, res) => {

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: req.body.type,
          },
          unit_amount: req.body.cartTotal * 100,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "http://localhost:3000/subscription2",
    cancel_url: "http://localhost:3000/stripepaymentcancel",
  });

  res.json({ id: session.id });
});


router.post("/create-checkout-session-data", async (req, res) => {

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: req.body.totalItems,
          },
          unit_amount: req.body.cartTotal * 100,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/stripepaymentcancel",
  });

  res.json({ id: session.id });
});

router.post("/order_detail", async (req, res) => {
  
 let data = {
   user_id: req.body.user_id, total_amount: req.body.total_amount, transaction_status:
     req.body.transaction_status, payment_type: req.body.payment_type, order_date: req.body.current_datetime
 };
 let sql = "INSERT INTO order_tbl SET ?";
 let query = db.query(sql, data, (err, result) => {
  if (err) throw err;
  const order_id = result.insertId;
   res.send(JSON.stringify({ success: true, insertid: order_id }));
 })
 })

router.post("/item_detail", async (req, res) => {
  let dataitem = req.body.items

  for (var key in dataitem) {
    
    var item_name = dataitem[key]['heading'];
    var item_amount = dataitem[key]['price'];
    var order_id = req.body.order_response;
    var date = req.body.current_datetime;
   var data = { order_id, item_name ,item_amount,date}
  let sql = "INSERT INTO item_tbl SET ?";
  let query = db.query(sql, data, (err, result) => {
    if (err) throw err;


     
    
  })
}
})








module.exports = router;