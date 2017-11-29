const express = require('express')
const router = express.Router()
const passport = require('passport');
require('../config/passport')(passport);

const usersController = require('../controllers/users')

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next()
  res.redirect('/');
}

router.get('/', usersController.getIndex)
router.get('/login', usersController.getLogin)
router.get('/logout', usersController.getLogout)
router.get('/signup', usersController.getSignUpForm)
router.post('/signup', usersController.createNewUser)
router.post('/signin', passport.authenticate('local', {
  successRedirect: '/users/profile',
  failureRedirect: '/users/login'
}));
router.get('/profile', isLoggedIn, usersController.getProfile)

module.exports = router
