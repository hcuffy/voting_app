const express = require('express');
const app = express();
const User = require('../models/user')

exports.getIndex = (req, res, next) => {
  res.render('index')
}

exports.getSignUpForm = (req, res, next) => {
  res.render('signup')
}

exports.getLogin = (req, res, next) => {
  res.render('login')
}

exports.createNewUser = (req, res, next) => {
  const {username, password} = req.body
  const newUser = new User({username, password})
  newUser.save(function(err) {
    if (err)
      return next(err)
    req.login(newUser, (err) => {
      if (err)
        return next(err)
      res.redirect('/polls/mypolls')
    })
  })
}

exports.getLogout = (req, res, next) => {
  req.logout();
  res.redirect('/');
}

exports.getProfile = (req, res, next) => {
  res.render('profile');
}
