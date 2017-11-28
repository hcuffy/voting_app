const path = require('path');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const logger = require('morgan');
const routes =  require('./routes');
const passport = require('passport');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/voting')

require('./config/passport')(passport);

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
app.use(cookieParser());
app.use(flash());


app.use('/', routes);

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log('Express server running on port', port)
});
