import TypesDBService from "../src/v1/models/type/TypesDBService.mjs"
import { parseBearer } from "../utils/jwtHelpers.mjs"

async function ensureAdmin(req, res, next) {
	try {
		console.log(req.user)
		
		const role = await TypesDBService.getById(req.user.role)
		
		if(role.title !== 'admin') {
			return res.status(403).json({ error: 'Access Only For Admin'})
		}
		next()
	} catch (error) {
		res.status(500).json({ result: "Internal Server Error ", error })
	}
}
async function checkAdminWithJWTToken (req, res, next) {
	const token = req.headers.authorization
	
	if (!token) {
		return false
	}
	try {
		const decoded = parseBearer(token, req.headers)
		console.log('decoded===>', decoded)
		if (decoded === 'TokenExpiredError'){
			return 'Your session is expired, log in again'
		}
		return true
	} catch (error) {
		console.log(error)
		return error 
	}
}
export {ensureAdmin, checkAdminWithJWTToken }