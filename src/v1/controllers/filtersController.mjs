import ProductsDBService from '../models/product/productsDBService.mjs'
import TypesDBService from '../models/type/TypesDBService.mjs'
import UsersDBService from '../models/user/UsersDBService.mjs'

class FilterService {
  static async getFiltersData(req, res) {
    try {
      // Виконання запитів паралельно з використанням Promise.all
      const [typesList, usersList, products] = await Promise.all([
        TypesDBService.getList(),
        UsersDBService.getListWithoutAdmin(),
			ProductsDBService.getList(req.query)
      ])

      // Повернення об'єднаних даних
      res.status(200).json({
        data: {
          types: typesList,
          users: usersList,
			 products
        },
        success: true,
      })
    } catch (error) {
      res.status(500).json({ error: 'Error fetching products' })
    }
  }
}

export default FilterService