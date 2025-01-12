
import ProvidersDBService from '../models/provider/providersDBService.mjs'

class FilterService {
  static async getFiltersData(req, res) {
    try {
      // Виконання запитів паралельно з використанням Promise.all
      const providers = await ProvidersDBService.getList()

      // Повернення об'єднаних даних
      res.status(200).json({
        data: {
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