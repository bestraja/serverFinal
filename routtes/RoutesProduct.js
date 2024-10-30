const express=require('express')
const router=express.Router()
const productcontroller=require('../controllers/productController')
const upload=require('../utils/multer')
const isAuth = require('../midelweras/IsAuth')



router.post('/uploadProduct',upload("products").single("file"),isAuth(),productcontroller.addproduct)
router.get('/listproduct',productcontroller.getproducts)
// query =>

router.patch('/:id',upload("products").single("file"),isAuth(),productcontroller.updateproduct)
router.delete('/:id',isAuth(),productcontroller.deleteproduct)

module.exports=router