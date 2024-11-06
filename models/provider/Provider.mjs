import mongoose from 'mongoose' 
 
const { Schema } = mongoose 
 
const productSchema = new Schema({ 
	title: { 
	  type: String, 
	  required: [true, 'Name is required'], 
	  minlength: [3, 'Name must be at least 3 characters long'], 
	  maxlength: [80, 'Name must be at most 80 characters long'], 
	  trim: true, 
	}
})

 const Provider = mongoose.model('Provider', productSchema) 
 export default Provider