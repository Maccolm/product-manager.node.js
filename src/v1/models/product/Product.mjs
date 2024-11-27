import mongoose from 'mongoose' 
import config from '../../config/default.mjs' 
 
const { Schema } = mongoose 
 
const productSchema = new Schema({ 
	title: { 
	  type: String, 
	  required: [true, 'Name is required'], 
	  minlength: [3, 'Name must be at least 3 characters long'], 
	  maxlength: [80, 'Name must be at most 80 characters long'], 
	  trim: true, 
	}, 
	amount: {
		type: Number,
		required: [true, 'Amount is required'], 
		trim: true, 
	},
	price: {
		type: Number,
		required: [true, 'Price is required'], 
		trim: true, 
	},
	including: {
		type: String,
		required: [true, 'including of components is required'], 
		trim: true, 
	},
	numStems: {
		type: Number,
		required: [true, 'number of stems is required'], 
		trim: true, 
	},
	info: {
		type: String,
		trim: true, 
	},
	imgSrc: {
		type: String
	},
	provider: { 
		type: Schema.Types.ObjectId, 
		ref: 'Provider',
		required: [true, 'Provider is required'], 
		minlength: [3, 'Provider must be at least 3 characters long'], 
		maxlength: [80, 'Provider must be at most 80 characters long'], 
		trim: true, 
	 }, 
})

productSchema.static.checkDatabaseExists = async () => { 
	const databases = await mongoose.connection.listDatabases() 
	return databases.databases.some((db) => db.name === config.databaseName) 
 } 
  
 productSchema.static.checkCollectionExists = async function () { 
	if (await this.checkDatabaseExists()) { 
	  const collections = await mongoose.connection.db 
		 .listCollections({ name: 'products' }) 
		 .toArray() 
	  return collections.length > 0 
	} 
	return false 
 } 
  
 const User = mongoose.model('Product', productSchema) 
 export default User