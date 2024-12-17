import { parseBearer } from "../utils/jwtHelpers.mjs"
import { match } from "path-to-regexp";
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
	app.use((req, res, next) => {
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
				req.user = parseBearer(req.headers.authorization, req.headers)
			} catch (err) {
				// Якщо авторизація не вдалася, повертається статус 401
				return res.status(401).json({ result: "Access Denied" })
			}
		}
		next() // Передача обробки наступному middleware
	})
}
// Експорт функції auth як модуля за замовчуванням
export default auth