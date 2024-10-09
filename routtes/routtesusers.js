const express=require('express')
const router=express.Router()
const usercontroller=require("../controllers/controleUser")
const { SignupCheck,validator } = require("../midelweras/validatore");
const upload=require("../utils/multer")

router.post('/signup',upload("image").single("file"),SignupCheck(),validator,usercontroller.signup)


module.exports=router