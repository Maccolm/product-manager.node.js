export function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
	  return next()
	}
	res.status(401).json({ message: 'Unauthorized' })
 }
 
export function ensureAdmin(req, res, next) {
	console.log('user==>', req.user )
	
	if (req.isAuthenticated() && req.user?.type?.title === 'admin') {
	  return next()
	}
	res.status(403).json({ message: 'Forbidden' }) 
}