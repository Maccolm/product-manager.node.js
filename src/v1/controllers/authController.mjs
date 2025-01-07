import User from "../models/user/User.mjs"
import UsersDBService from "../models/user/UsersDBService.mjs"
import { prepareToken } from "../../../utils/jwtHelpers.mjs";

class AuthController {
	// ---- автентиікація -----
	static async login(req, res) {
		if (!req.body.email) {
			return res.status(401).json({ error: "Email is required" })
		}
		if (!req.body.password) {
			return res.status(401).json({ error: "Password is required" })
		}
		try {
			console.log("Finding user by email:", req.body.email)
			const user = await UsersDBService.findOne({
				email: req.body.email,
			})
			if (!user) {
				console.log("User not found for email:", req.body.email)
				return res.status(401).json({ error: "User not found" })
			}
			console.log("Validating password for user:", user.email)
			const isValid = await user.validPassword(req.body.password)
			console.log('password valid', isValid)
			if (!isValid) {
				console.log("Invalid password for user:", user.email)
				return res.status(401).json({ error: "Wrong password or email" })
			}
			console.log("Preparing token for user:", user.email)
			const token = prepareToken(
				{
					id: user._id,
					username: user.username,
					role: user.type
				},
				req.headers
			);
			res.json({
				result: "Authorized",
				token,
				pagesPermissions: user.type.pagesPermissions,
			})
		} catch (err) {
			console.error("Error in login:", err);
			res.status(401).json({ error: "Wrong password or email" });
		}
	}

	// ---- вихід -----
	static logout(req, res) {
		req.logout();
		res.json({ message: "Logged out successfully" });
	}
}
export default AuthController;
