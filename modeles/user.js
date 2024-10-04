
const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
     firstName: String,
     lastName: String,
     email: {
          type: String,
          unique: true,
            },
     password: String,
     confirmPassword: String,
     image: String,

})
const user=mongoose.model("user",userSchema)

module.exports=user