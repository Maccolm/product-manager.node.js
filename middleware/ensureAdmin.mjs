import TypesDBService from "../src/v1/models/type/TypesDBService.mjs"
import { parseBearer } from "../utils/jwtHelpers.mjs"

async function ensureAdmin(req, res, next) {
	try {
		if(req.user && !req.user === 'TokenExpiredError') {
			const role = await TypesDBService.getById(req.user.role)
			if(role.title !== 'admin') {
				return res.status(403).json({ error: 'Access Only For Admin'})
			}
		} else if (req.user === 'TokenExpiredError') {	
			return res.status(401).json({ error: 'Your session is expired. You need to log in again'})
		}
		if(!req.user){
			return res.status(401).json({ error: 'Need to log in for access'})
		}
		next()
	} catch (error) {
		res.status(500).json({ result: "Internal Server Error", error })
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
			return 'Your session is expired. You need to log in again'
		}
		const role = await TypesDBService.getById(decoded.role)
			if(role.title !== 'admin') {
				return false
			}
		return true
	} catch (error) {
		console.log(error)
		return error 
	}
}
export {ensureAdmin, checkAdminWithJWTToken }