const express = require('express');
const router = express.Router();
const passport = require('passport');
const usersController = require('../controllers/users');
const pollsController = require('../controllers/polls');
require('../config/passport')(passport);

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next()
  res.redirect('/');
}

router.get('/', usersController.getIndex);
router.get('/login', usersController.getLogin);
router.get('/logout', usersController.getLogout);
router.get('/signup', usersController.getSignUpForm);
router.post('/signup', usersController.createNewUser);

router.post('/signin', passport.authenticate('local', {
  successRedirect: '/polls/mypolls',
  failureRedirect: '/users/login'

}));

router.get('/polls/mypolls', isLoggedIn, pollsController.getMyPolls);

module.exports = router
