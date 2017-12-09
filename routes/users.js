const express = require('express');
const router = express.Router();
const passport = require('passport');
const usersController = require('../controllers/users');
const pollsController = require('../controllers/polls');
require('../config/passport')(passport);

router.get('/', usersController.getIndex);
router.get('/login', usersController.getLogin);
router.get('/logout', usersController.getLogout);
router.get('/signup', usersController.getSignUpForm);
router.post('/signup', usersController.createNewUser);
router.get('/profile', usersController.getProfile)
router.post('/signin', passport.authenticate('local', {
  successRedirect: '/polls/mypolls',
  failureRedirect: '/users/login'

}));
router.get('/polls/mypolls', pollsController.getMyPolls);

module.exports = router
