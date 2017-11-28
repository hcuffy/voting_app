const express = require('express')
const router = express.Router()
const passport = require('passport');

const User = require('../models/user')

const usersController = require('../controllers/users')

router.get('/', usersController.getIndex)
router.get('/login', usersController.getLogin)
router.get('/logout', usersController.getLogout)
router.get('/signup', usersController.getSignUpForm)
router.get('/profile', usersController.getProfile)
router.post('/signup', function(req, res, next) {
  const { username, password } = req.body

  const newUser = new User({
    username,
    password
  })

  newUser.save(function(err) {
    if (err) return next(err)
    res.render('newpoll')
  })
});

module.exports = router
