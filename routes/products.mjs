import ProductController from '../controllers/products.mjs'
import { Router } from 'express'
import multer from 'multer'
import FormValidator from '../validators/formValidator.mjs'
import { checkSchema } from 'express-validator'
import { ensureAuthenticated } from '../middleware/auth.mjs'

const router = Router()

const storage = multer.diskStorage({
	destination: function (req, file, cd) {
		cd(null, 'uploads')
	},
	filename: function (req, file, cd) {
		cd(null, Date.now() + '-' + file.originalname)
	},
})
const upload = multer({ storage })

router.get('/', ProductController.allProducts)
router.get('/create', ProductController.createForm)
router.post('/create', 
	ensureAuthenticated,
	upload.single('imgSrc'),
	checkSchema(FormValidator.formSchema), 
	ProductController.createProduct)
router.get('/:id', ProductController.productDetails)
router.get('/edit/:id', ProductController.editProductForm)
router.post('/edit/:id',
	ensureAuthenticated, 
	upload.single('imgSrc'), 
	checkSchema(FormValidator.formSchema), 
	ProductController.updateProduct)
router.post('/', 
	ensureAuthenticated, 
	ProductController.createProduct)
router.delete('/', 
	ensureAuthenticated, 
	ProductController.deleteProduct)
	
export default router