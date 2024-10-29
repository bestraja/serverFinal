const express=require('express')
const router=express.Router()
const productcontroller=require('../controllers/productController')
const upload=require('../utils/multer')
const isAuth = require('../midelweras/IsAuth')



router.post('/uploadProduct',isAuth(),upload("products").single("file"),productcontroller.addproduct)
router.get('/listproduct',productcontroller.getproducts)
// query =>

router.patch('/:id',isAuth(),upload("products").single("file"),productcontroller.updateproduct)
router.delete('/:id',isAuth(),productcontroller.deleteproduct)

module.exports=router