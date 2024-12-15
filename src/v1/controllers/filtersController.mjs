import TypesDBService from '../models/type/TypesDBService.mjs'
import UsersDBService from '../models/user/UsersDBService.mjs'
import ProvidersDBService from '../models/provider/providersDBService.mjs'

class FilterService {
  static async getFiltersData(req, res) {
    try {
      // Виконання запитів паралельно з використанням Promise.all
      const [typesList, usersList, providers] = await Promise.all([
        TypesDBService.getList(),
        UsersDBService.getListWithoutAdmin(),
		  ProvidersDBService.getList()
      ])

      // Повернення об'єднаних даних
      res.status(200).json({
        data: {
          types: typesList,
          users: usersList,
			 providers
        },
        success: true,
      })
    } catch (error) {
      res.status(500).json({ error: 'Error fetching products' })
    }
  }
}

export default FilterService