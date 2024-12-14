import TypesDBService from '../models/type/TypesDBService.mjs'
import UsersDBService from '../models/user/UsersDBService.mjs'

class FilterService {
  static async getFiltersData(req, res) {
    try {
		console.log('req-query=====>', req.query)
		
      // Виконання запитів паралельно з використанням Promise.all
      const [typesList, usersList] = await Promise.all([
        TypesDBService.getList(),
        UsersDBService.getListWithoutAdmin(),
      ])

      // Повернення об'єднаних даних
      res.status(200).json({
        data: {
          types: typesList,
          users: usersList,
        },
        success: true,
      })
    } catch (error) {
      res.status(500).json({ error: 'Error fetching products' })
    }
  }
}

export default FilterService