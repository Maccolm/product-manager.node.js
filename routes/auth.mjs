import express from 'express'
import passport from 'passport'

const router = express.Router()

//render login page
router.get('/login', (req, res) => {
  res.render('users/login', { messages: null })
})

//login
router.post(
  '/login',
  (req, res, next) => {
    next()
  },
  passport.authenticate('local', {
    failureRedirect: '/auth/login',
	}),
	(req, res) => {
	  res.redirect('/')
	}
)

// logout
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err)
    }
    res.redirect('/')
  })
})

export default router