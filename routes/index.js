const express = require('express')
const router = express.Router()
const passport = require('passport');

router.use('/polls', require('./polls'))
router.use('/users', require('./users'))

router.get('/', (req, res) => {
  res.render('index')
})

module.exports = router
