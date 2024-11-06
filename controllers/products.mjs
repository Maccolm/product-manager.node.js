import ProductsDBService from '../models/product/productsDBService.mjs'
import ProvidersDBService from '../models/provider/providersDBService.mjs'
import { validationResult } from 'express-validator'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

class ProductController {
	static async allProducts(req, res) {
		try {
			const filters = {}
			for(const key in req.query){
				if(req.query[key])
					filters[key] = req.query[key]
			}
			const productList = await ProductsDBService.getList(filters)
			res.render('products/productsList' , {
				products: productList
			})
		} catch (error) {
			res.status(500).json({ error: error.message })
		}
	}
	static async productDetails(req, res) {
		try{
			const id = req.params.id
			const product = await ProductsDBService.getById(id)
			
			res.render('products/productDetails', {
				product,
			})
		} catch {
			res.status(500).json({ error: error.message })
		}
	}
	static async createForm(req, res) {
		try{
			const providers = await ProvidersDBService.getList()
			console.log('Poviders:', providers);
			
			res.render('products/productForm', { errors: [], product: null, providers })
		} catch (error) {
			res.status(500).json({ error: error.message })
		}
	}
	static async editProductForm(req, res) {
		try {
			const product = await ProductsDBService.getById(req.params.id)
			const providers = await ProvidersDBService.getList()
			res.render('products/productForm', { errors: [], product, providers })
		} catch (error) {
			res.status(500).json({ error: error.message })
		}
	}
	static async createProduct(req, res) {
		const errors = validationResult(req)
		console.log('========errors');
		console.log(errors);
		const providers = await ProvidersDBService.getList()

		if(!errors.isEmpty()) {
			const data = req.body
			if(req.params.id) data.id = req.params.id
			return res.status(400).render('products/productForm', { 
				errors: errors.array(),
				product: data,
				providers 
			})
		}
		try {
			const productData = { imgSrc: req.file.filename, ...req.body, providers }
			console.log(productData);
			
			await ProductsDBService.create(productData)
			res.redirect('/products')
		} catch (error) {
			res.status(500).render('products/productForm', {
				errors: [{ msg: error.message }],
				product: req.body,
				providers
			 })
		}
	}
	static async updateProduct(req, res) {
		console.log('------updateProduct')

		const errors = validationResult(req)
		console.log('========errors');
		console.log(errors);
		const providers = await ProvidersDBService.getList()

		if(!errors.isEmpty()) {
			const data = req.body
			if(req.params.id) data.id = req.params.id
			return res.status(400).render('products/productForm', { 
				errors: errors.array(),
				product: data,
				providers
			})
		}
		console.log(req.body)

		try {
			const updatedProductData = req.file ? { imgSrc: req.file.filename, ...req.body, providers} : req.body
	
			await ProductsDBService.update(req.params.id, updatedProductData)
			res.redirect('/products')
		} catch (error) {
			res.status(500).render('products/productForm', {
				errors: [{ msg: error.message }],
				product: req.body,
				providers
			 });
		}
	}
	static async deleteProduct(req, res) {
		try {
			const product = await ProductsDBService.getById(req.body.id)
			if(!product) 
				return res.status(404).json({ success: false, message: 'Product not found' })

			const imgPath = path.join(__dirname, '../uploads', product.imgSrc)
			
			await ProductsDBService.deleteById(req.body.id)
			await ProductController.deleteImg(imgPath)
			res.json({ success: true }) 
		} catch (error) {
			res.status(500).json({ success: false, message: 'Failed to delete product' })
		}
	}
	static async deleteImg(imgPath) {
		try{
			if (fs.existsSync(imgPath)) {
				fs.unlink(imgPath, (err) => {
					if (err) {
						console.error('Error deleting image:', err)
					} else {
						console.log('Image deleted successfully')
					}
				})
			} else {
				console.log('Image file not found');
			}
		} catch (err) {
			console.error('Error deleting image:', err);
		}
	}
}
export default ProductController