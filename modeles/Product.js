const mongoose=require('mongoose')
const user=require("./user")

const schemaProduct = mongoose.Schema({
    name: String,
    category:String,
    file: String,
    price: String,
    description: String,
    seller:{type:mongoose.Schema.ObjectId,ref:user},
    date:{type:Date,default:Date.now}
  });
  const product = mongoose.model("Product",schemaProduct)
  module.exports=product
  