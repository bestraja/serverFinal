const mongoose=require("mongoose")

const connectDatabase=async()=>{
    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect(process.env.URI)
       
        
    } catch (error) {
       
    }
}

module.exports=connectDatabase