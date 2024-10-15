const express = require("express");
const mongoose=require("mongoose")
const path = require('path');
const cors = require("cors");
require("dotenv").config()
const RoutesUser = require("./routtes/routtesusers")
const RoutesProduct=require('./routtes/RoutesProduct')
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



const PORT = process.env.PORT ||5050 ;

app.listen(PORT,(err)=>{
  err ? console.log(err):
  console.log("server is running");
})

