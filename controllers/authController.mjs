import User from "../models/user.js";
import passport from "passport";
class AuthController {
	// ---- автентиікація -----
	static login(req, res, next) {
		passport.authenticate("local", (err, user, info) => {
			if (err) return next(err);
			if (!user) return res.status(400).json({ message: info.message });
			req.logIn(user, (err) => {
				if (err) return next(err);
				res.json(user);
			});
		})(req, res, next);
	}
	// ---- вихід -----
	static logout(req, res) {
		req.logout();
		res.json({ message: "Logged out successfully" });
	}
}
export default AuthController;
