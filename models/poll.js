const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PollSchema = new Schema({
  title: String,
  options: Object,
  user: String,
  voters: Array
}, {timestamps: true});

const ModelClass = mongoose.model('poll', PollSchema);
module.exports = ModelClass
