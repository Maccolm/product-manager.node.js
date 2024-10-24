import Product from "../models/Product.mjs";
import { validationResult } from 'express-validator'

class ProductController {
	static allProducts(req, res) {
		const productList = Product.loadProductList()
		res.render('products/productsList' , {
			products: productList
		})
	}
	static productDetails(req, res){
		const id = req.params.id
		const product = Product.getProductById(id)
		res.render('products/productDetails', {
			product
		})
	}
	static createForm(req, res) {
		res.render('products/productForm', { errors: [], product: null })
	}
	static editProductForm(req, res) {
		const product = Product.getProductById(req.params.id)
		res.render('products/productForm', { errors: [], product })
	}
	static createProduct(req, res){
		const errors = validationResult(req)
		console.log('========errors');
		console.log(errors);
		
		if(!errors.isEmpty()) {
			const data = req.body
			if(req.params.id) data.id = req.params.id
			return res.status(400).render('products/productForm', { 
				errors: errors.array(),
				product: data
			})
		}

		const productData = { imgSrc: req.file.filename, ...req.body }
		console.log(productData);
		
		Product.addNewProduct(productData)
		res.redirect('/products')
	}
	static updateProduct(req, res) {
		console.log('------updateProduct')

		const errors = validationResult(req)
		console.log('========errors');
		console.log(errors);
		
		if(!errors.isEmpty()) {
			const data = req.body
			if(req.params.id) data.id = req.params.id
			return res.status(400).render('products/productForm', { 
				errors: errors.array(),
				product: data
			})
		}
		console.log(req.body);
		const updatedProductData = req.file ? { imgSrc: req.file.filename, ...req.body} : req.body

		Product.updateProductById(req.params.id, updatedProductData)
		res.redirect('/products')
	}
	static deleteProduct(req, res) {
		console.log(req.body.id)
		
		Product.deleteProductById(req.body.id)
		res.send(200, 'ok')
		res.redirect('/products')
	}
}
export default ProductController