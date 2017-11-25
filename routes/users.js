const express = require('express')
const router = express.Router()
const usersController = require('../controllers/users')

router.get('/index', usersController.getIndex)
router.get('/login', usersController.getLogin)
router.get('/signup', usersController.getSignUpForm)


module.exports = router
