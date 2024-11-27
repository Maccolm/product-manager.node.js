import Provider from "./Provider.mjs";

class ProvidersDBService { 
  static async getList() { 
    try { 
      return await Provider.find({})
    } catch (error) { 
		console.log(error);	
      return [] 
    } 
  } 
} 
 
export default ProvidersDBService 