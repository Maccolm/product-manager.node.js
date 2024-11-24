import express from "express";
import productsRouter from "./products.mjs"
import authRouter from "./auth.mjs"
import usersRouter from './users.mjs'

const router = express.Router()

router.get('/', (req, res) => {
	res.render('index')
})
router.use('/auth', authRouter)
router.use('/products', productsRouter)
router.use('/users', usersRouter)
router.get("/about", (req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'about.html'))
})

export default router