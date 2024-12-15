import Product from './Product.mjs'
import MongooseCRUDManager from '../MongooseCRUDManager.mjs';
 
class ProductsDBService extends MongooseCRUDManager{
  /**
   * Конфігурація полів для фільтрації та пошуку (які будемо опрацьовувати).
   */
  static fieldsConfigurations = [
	{
	  fieldName: 'title',
	  filterCategory: 'search',
	},
	{
	  fieldName: 'price',
	  filterCategory: 'range',
	},
	{
	  fieldName: 'provider',
	  filterCategory: 'list',
	},
 ]

 /**
  * Отримує список продуктів з урахуванням запиту користувача.
  *
  * @param {Object} reqQuery - Об'єкт з параметрами запиту, включаючи фільтри, сортування та пагінацію.
  * @returns {Promise<Product[]>} - Promise, який вирішується масивом знайдених продуктів.
  */

async getListWithQuery(reqQuery) { 
    try { 
		const res = await this.findManyWithSearchOptions(
			reqQuery,
			ProductsDBService.fieldsConfigurations,
			null,
			[
				{
					fieldForPopulation: {
						path: 'provider',
						populate: {
							path: 'type',
						},
					},
				},
			]
		)
		console.log('reqQuery',reqQuery);
		console.log('res',res);
		
      return res
    } catch (error) { 
		console.log(error);
		
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
		return await Product.findById(id).populate('provider')
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
 
export default new ProductsDBService(Product) 