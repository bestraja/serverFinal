
const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
     firstname: String,
     lastname: String,
     email: {
          type: String,
          unique: true,
            },
     password: String,
     confirmPassword: String,
     image: String,
     role:{type:String,enum:["user","admin"],default:"user"}
})
const user=mongoose.model("user",userSchema)

module.exports=user