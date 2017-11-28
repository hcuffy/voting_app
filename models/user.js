const mongoose = require('mongoose')
const bcrypt   = require('bcrypt-nodejs')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  username: String,
  password: String
}, {timestamps: true})


UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

const ModelClass = mongoose.model('user', UserSchema)
module.exports = ModelClass
