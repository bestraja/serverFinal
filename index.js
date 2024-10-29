const express = require("express");
const mongoose=require("mongoose")
const path = require('path');
const cors = require("cors");
require("dotenv").config()
const Stripe = require('stripe')
const RoutesUser = require("./routtes/routtesusers")
const RoutesProduct=require('./routtes/RoutesProduct')
const Order = require('./modeles/Order')
const app = express();
const connectdb=require("./config/connect")

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200,
 }
connectdb()



app.use(cors())
app.use(express.json())

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
//Routes
//api
app.get("/", (req, res) => {
    res.send("Server is running");
  });
app.use('/api/user',RoutesUser)
app.use('/api/product',RoutesProduct)
/*****payment  */

const stripe  = new Stripe(process.env.STRIPE_SECRET_KEY)

app.post("/create-checkout-session",async(req,res)=>{

     try{
      const params = {
          submit_type : 'pay',
          mode : "payment",
          payment_method_types : ['card'],
          billing_address_collection : "auto",
          shipping_options : [{shipping_rate : "shr_1QDnLHAS5sdefIl1VSllkImD"}],

          line_items : req.body.map((item)=>{
            return{
              price_data : {
                currency : "eur",
                product_data : {
                  name : item.name,
                  
                },
                unit_amount : item.price * 100,
              },
              adjustable_quantity : {
                enabled : true,
                minimum : 1,
              },
              quantity : item.qty
            }
          }),

          success_url :`http://localhost:3000/success`, 
          cancel_url : `http://localhost:3000/cancel`,

      }

      
      const session = await stripe.checkout.sessions.create(params)
      
      res.status(200).json({ id: session.id });
     }
     catch (err){
        res.status(err.statusCode || 500).json(err.message)
     }

})

//order 
app.post('api/orders', async (req, res) => {
  try {
    const orderData = req.body;

    // Créer une nouvelle commande
    const order = new Order(orderData);
    await order.save();

    res.status(201).json({ message: 'Order created successfully', order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating order', error: error.message });
  }
});












const PORT = process.env.PORT ||5050 ;

app.listen(PORT,(err)=>{
  err ? console.log(err):
  console.log("server is running");
})