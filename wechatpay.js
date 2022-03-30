const express = require("express");
const app = express();
var router = express.Router();
const db = require('./dbConnection');
const secretKey = "sk_test_RgC3iTPxF7mKGJUJcHvczLJZ";

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

router.post("/create-checkout-wechatpay", async (req, res) => {
    console.log(req.body.type)
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["wechat_pay"],
    line_items: [
      {
        price_data: {
          currency: "sgd",
          product_data: {
            name: req.body.type,
          },
          unit_amount: req.body.payment * 100,
        },
        quantity: 1,
      },
    ],
    payment_method_options: {
        wechat_pay: {
          client: 'web',
        },
      },
    mode: "payment",
    success_url: "http://localhost:3000/subscription2",
    cancel_url: "http://localhost:3000/stripepaymentcancel",
  });

  res.json({ id: session.id });
});

router.post("/create-checkout-wechatpay-data", async (req, res) => {
  console.log(req.body.type)
const session = await stripe.checkout.sessions.create({
  payment_method_types: ["wechat_pay"],
  line_items: [
    {
      price_data: {
        currency: "sgd",
        product_data: {
          name: req.body.totalItems,
        },
        unit_amount: req.body.cartTotal * 100,
      },
      quantity: 1,
    },
  ],
  payment_method_options: {
      wechat_pay: {
        client: 'web',
      },
    },
  mode: "payment",
  success_url: "http://localhost:3000/subscription2",
  cancel_url: "http://localhost:3000/stripepaymentcancel",
});

res.json({ id: session.id });
});

module.exports = router;