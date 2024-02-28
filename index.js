/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_KEY)
// the above codes enable me to use stripe by using my secret key from .env
const app = express();
app.use(cors({ origin: true }));
app.use(express.json());
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Success !",
  });
});
app.post("/payment/create", async (req, res) => {
    const total = req.query.total;
    if (total > 0) {
       
      const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "usd",
      });
     
 console.log(paymentIntent)
      res.status(201).json
      ({
        clientSecret: paymentIntent.client_secret,
      });
    } 
    else {
      res.status(403).json({
        message: "total must be greater than 0",
      });
    }
  }

  );
app.listen(5000, (err)=>{
    if(err) throw err
    console.log("Amazon server running on port: 5000, http://localhost:5000")
})