const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const logger = require('morgan');
const passport = require('passport');
const session = require('express-session');

const app = express();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/henry-voting', {
  useMongoClient: true
})

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json('*/*'));
app.use(logger('combined'));
app.use(session({
  secret: 'voteonitagainagain',
  saveUninitialized: true,
  resave:true
}));
app.use(passport.initialize());
app.use(passport.session());

const routes =  require('./routes');
app.use('/', routes);

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log('Express server running on port', port)
});
