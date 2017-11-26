const express = require('express')
const router = express.Router()
const passport = require('passport');
const usersController = require('../controllers/users')

router.get('/', usersController.getIndex)
router.get('/login', usersController.getLogin)
router.get('/logout', usersController.getLogout)
router.get('/signup', usersController.getSignUpForm)
router.get('/profile', usersController.getProfile)
router.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile',
        failureRedirect : '/signup',
        failureFlash : true
    }));

module.exports = router
