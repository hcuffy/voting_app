const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const logger = require('morgan')

const routes = require('./routes')
const app = express()

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/new-voting', {
  useMongoClient: true
})

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())
app.use(logger('combined'))

app.use('/', routes)

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log('Express server running on port', port)
})
