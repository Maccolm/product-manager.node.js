import User from "../models/user/User.mjs";
import UsersDBService from "../models/user/UsersDBService.mjs";

class AuthController {
	// ---- автентиікація -----
	static async login(req, res) {
		if (!req.body.email) {
			return res.status(401).json({ error: "Email is required" });
		}
		if (!req.body.password) {
			return res.status(401).json({ error: "Password is required" });
		}
		try {
			const user = await UsersDBService.findOne({
				email: req.body.email,
			});
			if (!user) {
				return res.status(401).json({ error: "User not found" });
			}
			if (!user.validPassword(req.body.password)) {
				return res.status(401).json({ error: "Login error" });
			}
			const token = prepareToken(
				{
					id: user._id,
					username: user.username,
				},
				req.headers
			);
			res.json({
				result: "Authorized",
				token,
			});
		} catch (err) {
			res.status(401).json({ error: "Login error" });
		}
	}

	// ---- вихід -----
	static logout(req, res) {
		req.logout();
		res.json({ message: "Logged out successfully" });
	}
}
export default AuthController;
