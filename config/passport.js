const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

module.exports = function(passport) {

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use('local-signup', new LocalStrategy({
    usernameField: 'name',
    passwordField: 'password',
    passReqToCallback: true
  }, function(req, name, password, done) {

    process.nextTick(function() {

      User.findOne({
        username: name
      }, function(err, user) {
        if (err)
          return done(err);

        if (user) {
          return done(null, false, req.flash('signupMessage', 'Email Already Exists.'));
        } else {
          var newUser = new User();
          newUser.username = name;
          newUser.password = newUser.generateHash(password);
          newUser.save(function(err) {
            if (err)
              return err;
            return done(null, newUser);
          });
        }

      });

    });

  }));

};
