import dataFileManager from '../utils/DataFileManager.mjs'
class Product {
	static loadProductList() {
		try {
			return dataFileManager.loadData()
		} catch (error) {
			throw new Error('Error to load data', error)
		}
	}
	static addNewProduct(objProduct){
		try {
			dataFileManager.addItem(
				{id: new Date().getTime(), ...objProduct}
			)
		} catch (error) {
			throw new Error('Couldn\'t add item', error)
		}
	}
	static getProductById(id){
		try {
			return dataFileManager.getItemById(id)
		} catch (error) {
			throw new Error('Cannot open the file', error)
		}
	}
	static updateProductById(id, productData){
		try {
			dataFileManager.updateItemById(id, productData)
		} catch (error) {
			throw new Error('Error to update the product', error)			
		}
	}
	static deleteProductById(id){
		try {
			dataFileManager.deleteItemById(id)
		} catch (error) {
			throw new Error("It was error with deleting this item", error);
		}
	}
}
export default Product