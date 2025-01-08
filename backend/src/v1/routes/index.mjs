import express from "express";
import productsRouter from "./products.mjs"
import authRouter from "./auth.mjs"
import usersRouter from './users.mjs'
import cartRouter from './cartRoutes.mjs'
import usersTypesRoutes from './usersTypesRoutes.mjs'

const router = express.Router()

router.get('/', (req, res) => {
	res.render('index', { user: req.user })
})
router.use('/auth', authRouter)
router.use('/products', productsRouter)
router.use('/users', usersRouter)
router.use('/cart', cartRouter)
router.use('/users_types', usersTypesRoutes)
router.get("/about", (req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'about.html'))
})

export default router