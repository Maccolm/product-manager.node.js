import ProductController from '../controllers/products.mjs'
import { Router } from 'express'
import multer from 'multer'
import FormValidator from '../../../validators/formValidator.mjs'
import { checkSchema } from 'express-validator'
import { ensureAdmin } from '../../../middleware/ensureAdmin.mjs'
import { getPermissionsChecker } from '../../../middleware/auth.mjs'
import FilterService from '../controllers/filtersController.mjs'

const router = Router()
const permissionsChecker = getPermissionsChecker('products')
const storage = multer.diskStorage({
	destination: function (req, file, cd) {
		cd(null, 'uploads')
	},
	filename: function (req, file, cd) {
		cd(null, Date.now() + '-' + file.originalname)
	},
})
const upload = multer({ storage })

router.get('/', permissionsChecker('read'), ProductController.allProducts)
router.get('/filters-data', FilterService.getFiltersData)
router.get('/create', 
	ProductController.createForm)
router.post('/create', 
	upload.single('imgSrc'),
	checkSchema(FormValidator.formSchema), 
	ProductController.createProduct)
router.get('/:id', permissionsChecker('read'), ProductController.productDetails)
router.get('/edit/:id',
	ensureAdmin,
	ProductController.editProductForm)
router.post('/edit/:id',
	ensureAdmin,
	upload.single('imgSrc'), 
	checkSchema(FormValidator.formSchema), 
	ProductController.updateProduct)
router.post('/', 
	ensureAdmin,
	ProductController.createProduct)
router.delete('/:id', 
	ensureAdmin,
	ProductController.deleteProduct)
	
export default router