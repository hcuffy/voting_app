const express = require('express');
const app = express();

exports.getIndex = (req, res, next) => {
  res.render('index')
}

exports.getSignUpForm = (req, res, next) => {
  res.render('signup')
}

exports.getLogin = (req, res, next) => {
  res.render('login')
}
