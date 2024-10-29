import ProductController from '../controllers/products.mjs'
import { Router } from 'express'
import multer from 'multer'
import FormValidator from '../validators/formValidator.mjs'
import { checkSchema } from 'express-validator'

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
router.post('/create', upload.single('imgSrc'), checkSchema(FormValidator.formSchema), ProductController.createProduct)
router.get('/:id', ProductController.productDetails)
router.get('/edit/:id', ProductController.editProductForm)
router.post('/edit/:id', upload.single('imgSrc'), checkSchema(FormValidator.formSchema), ProductController.updateProduct)
router.post('/', ProductController.createProduct)
router.delete('/', ProductController.deleteProduct)
export default router