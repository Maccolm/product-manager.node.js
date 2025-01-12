import { parseBearer } from "../utils/jwtHelpers.mjs"
import { match } from "path-to-regexp"

// Функція для налаштування аутентифікації та авторизації
const auth = (app) => {
	// Middleware для налаштування заголовків CORS
	app.use(function (req, res, next) {
		res.header("Access-Control-Allow-Origin", "*")
		res.header(
			"Access-Control-Allow-Headers",
			"Origin, X-Requested-With, Content-Type, Accept, Authorization"
		);
		res.header(
			"Access-Control-Allow-Methods",
			"GET, POST, OPTIONS, PUT, PATCH, DELETE"
		);
		next() // Передача обробки наступному middleware
	});
	// Middleware для перевірки аутентифікації та авторизації
	app.use( async (req, res, next) => {
		// Відкриті шляхи, які не потребують авторизації
		const openPaths = [
			"/api/v1/auth/login",
			"/api/v1/auth/signup",
			"/api/v1/products",
			"/api/v1/products/:id",
			"/uploads/:filename"
		]
		
		// Перевірка, чи шлях потребує авторизації
		const isOpenPath = openPaths.some((path) => {
			const matcher = match(path, { decode: decodeURIComponent })
			return matcher(req.path)
		})
		if (!isOpenPath) {
			console.log('open closed path')
			
			try {
				// Парсинг токена та додавання користувача до запиту
				const userData = parseBearer(req.headers.authorization, req.headers)
				// const rqUser = await UsersDBService.getUserById(userData.id, ['type'])
				// console.log('req.user =', rqUser);
				
			} catch (err) {
				// Якщо авторизація не вдалася, повертається статус 401
				return res.status(401).json({ result: "Access Denied" })
			}
		}
		next() // Передача обробки наступному middleware
	})
}

// Middleware для перевірки дозволів
const getPermissionsChecker = (model) => (requiredPermission) => {
	return (req, res, next) => {
		const userPermissionsHeader = req.headers['permissions']
	  if (!userPermissionsHeader) {
		 return res.status(403).json({ result: 'Permission Denied' })
	  }

	  let userPermissions = JSON.parse(userPermissionsHeader)
	  // Перевірка, чи є необхідний дозвіл у користувача
	  const hasPermission = userPermissions?.[model]?.[requiredPermission]
	  
	  if (hasPermission) {
		 next() // Передача обробки наступному middleware
	  } else {
		 res.status(403).json({ result: 'Permission Denied' })
	  }
	}
 }
 const authenticateToken = (req, res, next) => {
	const authHeader = req.headers['authorization']
	if (!authHeader)
		return res.status(401).json({ message: 'No token provided' })

	const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null
	if (!token) {
		return res.status(401).json({ message: 'Invalid token format' })
	}

	try {
		const decoded = jwt.verify(token, prepareSecret(req.headers))
		req.user = decoded
		next()
	} catch (error) {
		if (err.name === 'TokenExpiredError') {
			return res.status(401).json({ message: 'Token expired' })
		}
		return res.status(403).json({ message: 'Invalid token' })
	}
 }
// Експорт функції auth як модуля за замовчуванням
export { auth, getPermissionsChecker, authenticateToken }
