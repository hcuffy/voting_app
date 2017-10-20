const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PollSchema = new Schema({
  title: String,
  options: Array,
  user: String,
  voters: Array
}, { timestamps: true })

const ModelClass = mongoose.model('poll', PollSchema)
module.exports = ModelClass
