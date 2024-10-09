const User = require("../modeles/user"); 
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
    const { email, password, role} = req.body;

    try {
        
        if (role) {
            return res.status(403).send("Non autorisé"); 
        }


        const emailExists = await User.findOne({ email: email });
        if (emailExists) {
            return res.status(400).send({ msg: "Email already exists, please login" }); 
        }

        
        const passwordHashed = await bcrypt.hash(password, 10);
        req.body.password = passwordHashed;

       
        if (!req.file) {
            
    
            return res.status(400).send({ msg: "No file uploaded" });
                    }
            
                    // Build the image URL
                    const url = `${req.protocol}://${req.get("host")}/uploads/${req.file.path}`;
            
        // Create a new user
        const newUser = new User(req.body);
        newUser.image = url;
        await newUser.save();

        return res.status(201).send({ msg: "Signup successful" });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ msg: "Internal server error" }); // Handle errors properly
    }
};


exports.login=async(req,res)=>{
    
    const { email, password } = req.body
    try {
        const existUser = await user.findOne({ email })
        if (!existUser) {
            return res.status(400).send({ msg: "bad credential !!" })
        }
        const isMatched = await bcrypt.compare(password, existUser.password)

        if (!isMatched) {
            return res.status(400).send({ msg: "bad credential !!" })
        }
        const payload = { _id: existUser._id }
        const token = jwt.sign(payload, process.env.secretKey,{ expiresIn: '1h' })

          existUser.password=undefined
          res.cookie('token',token)
          return res.send({user:existUser}) 
       
    } catch (error) {
        console.log(error);
        
    }
}

exports.current= (req, res) => {
    try{
      res.send(req.user);
  } catch (error) {
      console.log(error);
      }
    }
exports.updateuser=async(req,res)=>{
    try {
         const result=await user.findByIdAndUpdate(req.params.id,req.body,{ new: true })
        
       res.status(200).send(result)
    } catch (error) {
        console.log(error);
    }
}

exports.updatepassword=async(req,res)=>{

    const {currentpassword,newpassword}=req.body
   
    try {
        
      const finduser= await user.findById(req.params.id)
      const isMatched = await bcrypt.compare(currentpassword,finduser.password)
     if(isMatched)
    {   if(currentpassword==newpassword){
        return res.status(400).send({msg:"password already exist "})
    } 
    else  {
         const  hash_newpassword = await bcrypt.hash(newpassword,10)
         const updatenewpassword = await user.findByIdAndUpdate(req.params.id,{password:hash_newpassword},{ new: true })
        return    res.status(200).send(updatenewpassword)
        }
      
}
  else return res.status(400).send("bad current password")

   } catch (error) {
    console.log(error);
   }
}