import TypesDBService from "../src/v1/models/type/TypesDBService.mjs";
async function ensureAdmin(req, res, next) {
	try {
		console.log(req.user);
		
		const role = await TypesDBService.getById(req.user.role)
		
		if(role.title !== 'admin') {
			return res.status(403).json({ error: 'Access Only For Admin'})
		}
		next()
	} catch (error) {
		res.status(500).json({ result: "Internal Server Error ", error })
	}
}
export default ensureAdmin