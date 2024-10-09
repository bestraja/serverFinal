const mongoose=require("mongoose")

const connectDatabase=async()=>{
    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect(process.env.URI)
        console.log("connect to Database");
        
    } catch (error) {
        console.log(error);
    }
}

module.exports=connectDatabase