const express = require("express");
const mongoose=require("mongoose")
const cors = require("cors");
require("dotenv").config()
const connectdb=require("./config/connect")
const app = express();



mongoose.set("strictQuery", false);
connectdb()


app.use(cors())
app.use(express.json({limit:"10mb"}))
const PORT = process.env.PORT ||5050 ;
//Routes
app.get("/",(req,res)=>{ res.send("server is runnig")})
app.post('/signup',(req,res)=> {console.log(req.body); res.send("Signup data received");})


 app.listen(PORT, () =>  console.log("server is running at port : " + PORT));


