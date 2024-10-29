import Product from './Product.mjs' 
import mongoose from 'mongoose' 
 
class ProductsDBService { 
  static async getList() { 
    try { 
      const exists = await Product.checkCollectionExists 
      if (exists) { 
        const data = await mongoose.model(collectionName).find().exec() 
        return data 
      } 
 
      return (await Product.find({})) ?? [] 
    } catch (error) { 
      return [] 
    } 
  } 
 
  static async create(data) { 
	try {
		const product = new Product(data) 
		return await product.save() 
	} catch (error) {
		console.error('Error to create product', error);
	}
  } 
 
  static async getById(id) { 
	try {
		return await Product.findById(id) 
	} catch (error) {
		console.error('error to get product', error);
		return null
	}
  } 
 
  static async update(id, data) { 
	try {
		return await Product.findByIdAndUpdate(id, data, { 
		  new: true, 
		  runValidators: true, 
		}) 
	} catch (error) {
		console.error('Error to update a product', error);
		return null
	}
  } 
 
  static async deleteById(id) {
	try {
		return await Product.findByIdAndDelete(id) 
	} catch (error) {
		console.error('Error to delete product', error);
		return null
	}
  } 
} 
 
export default ProductsDBService 