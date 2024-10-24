const express=require('express')
const router=express.Router()
const productcontroller=require('../controllers/productController')
const upload=require('../utils/multer')


router.post('/uploadProduct', upload("products").single("file"),productcontroller.addproduct)
router.get('/listproduct',productcontroller.getproducts)
// query =>

router.patch('/:id',upload("products").single("file"),productcontroller.updateproduct)
router.delete('/:id',productcontroller.deleteproduct)

module.exports=router