const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// load user model
const User = mongoose.model('users');

module.exports = function(passport) {
  passport.use(new localStrategy({
      usernameField: 'email'
    },
    (email, password, done) => { // handle the input
      // match user
      User.findOne({
          email: email
        })
        .then((user) => {
          if (!user) {
            // err , user, msg
            return done(null, false, {
              message: 'no user found'
            });
          }

          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, {
                message: 'incorrect password'
              });
            }
          });
        });
    }));

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
};
