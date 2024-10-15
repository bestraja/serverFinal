
const product = require ('../modeles/Product')

exports.addproduct = async (req, res) => {
    
    try {
        const newProduct = new product(req.body);
        const url = `${req.protocol}://${req.get("host")}/${req.file.path}`
             newProduct.file=url
        await newProduct.save();
  return res.status(201).send({msg:"product add succes"})
    } catch (error) {
        console.error(error);

    }
};

exports.getproducts=async(req,res)=>{
    try {
      let getproducts= await product.find().populate("seller")
        return res.status(200).send(getproducts)
    } catch (error) {
        console.log(error);
    }
}

exports.updateproduct=async(req,res)=>{
    try {
       
      let updateproducts= await product.findByIdAndUpdate(req.params.id,req.body,{ new: true })
    
      if(req.file){
        productUpdated = await  product.findOne({ _id: req.params.id })
      const url = `${req.protocol}://${req.get("host")}/${req.file.path}`
               productUpdated.img =url
           await productUpdated.save()
    }
      return res.status(200).send(updateproducts)

    } catch (error) {
        console.log(error);
    }
}

exports.deleteproduct=async(req,res)=>{
    try {
        let result=await product.deleteOne({_id:req.params.id})
        return res.status(200).send(result)
    } catch (error) {
        console.log(error);
        
    }
}

exports.getproductbycategory=async(req,res)=>{
   
    console.log(req.query);
    try {
         const getProductbycategory= await product.find({category:req.query.category})
       
         if (getProductbycategory) {
              return res.status(200).send(getProductbycategory)
         }
         else  return res.status(400).send({msg:"no products"}) 
    } catch (error) {
        console.log(error);
    }
}