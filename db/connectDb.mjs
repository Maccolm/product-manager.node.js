import config from '../config/default.mjs' 
// importing necessary files 
import mongoose from 'mongoose' 
 
//Install global promises
mongoose.Promise = global.Promise 
// Function to connect to MongoDB
export default async function () { 
  try { 
    await mongoose.connect(config.mongoURI, { 
      useNewUrlParser: true, 
      useUnifiedTopology: true, 
    }) 
    console.log('Successful connected to MongoDB') 
  } catch (err) { 
    console.error('Error to connect MongoDB:', err) 
  } 
} 