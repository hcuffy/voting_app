const express = require('express');
const app = express();

exports.getIndex = (req, res, next) => {
  res.render('index')
}

exports.getSignUpForm = (req, res, next) => {
  res.render('signup', { message: req.flash('signupMessage')})
}

exports.getLogin = (req, res, next) => {
  res.render('login', {message: req.flash('loginMessage')})
}


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}

exports.getLogout = (req, res, next) => {
  req.logout();
  res.redirect('/');
}

exports.getProfile = (req, res, next) => {
//, {user : req.user }
  res.render('profile');
}
