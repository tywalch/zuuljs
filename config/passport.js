var LocalStrategy  = require('passport-local').Strategy;
var passportdb     = require('../lib/models/passportdb');
var securePassword = require('../bin/utilities/securepassword');

module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        return done(null, user.userId);
    });

    passport.deserializeUser(function(userId, done) {
        passportdb.getUserById(userId, function(err, row) {
            return done(err, row);
        });
    });

    passport.use(
        'local-signup',
        new LocalStrategy({
                usernameField : 'email',
                passwordField : 'password',
                passReqToCallback : true
        },
        function(req, email, password, done) {
            passportdb.getUserByEmail(email, function(err, rows) {
                if (err) {
                    return done(err);
                }
                if (rows.length) {
                    return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                } else if (password.length < 8) {
                    return done(null, false, req.flash('signupMessage', 'Please enter a longer password'));
                } else {
                    var hash = securePassword.hashAndSalt(password);
                    var userDetails = {
                        email: email,
                        password: hash,
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        particleToken: req.body.particleToken
                    };
                    passportdb.insertNewUser(userDetails, function(err, user) {
                        return done(null, user);
                    });
                }
            });
        })
    );

    passport.use(
        'local-login',
        new LocalStrategy({
                usernameField : 'email',
                passwordField : 'password',
                passReqToCallback : true
            },
            function(req, email, password, done) {
                passportdb.getUserByEmail(email, function(err, rows) {
                    if (err) {
                        return done(err);
                    }
                    if (!rows.length) {
                        return done(null, false, req.flash('loginMessage', 'No user found.'));
                    }
                    var passCheck = securePassword.verifyPassword(password, rows[0].password);
                    if (!passCheck) {
                        return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
                    }
                    return done(null, rows[0]);
                });
            }
        )
    );

    passport.use(
      'local-password-reset',
      new LocalStrategy({
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true
        },
        function(req, email, password, done) {
            if (req.body.newPassword !== req.body.confirmNewPassword) {
                return done(null, false, req.flash('errorReset', 'Passwords do not match'));
            }
            passportdb.getUserByEmail(email, function(err, rows) {
                if (err) {
                    return done(err);
                }
                if (!rows.length) {
                    return done(null, false, req.flash('errorReset', 'No user found.'));
                }
                if (password.length < 8) {
                    return done(null, false, req.flash('signupMessage', 'Please enter a longer password'));
                }
                var passCheck = securePassword.verifyPassword(password, rows[0].password);
                if (!passCheck) {
                    return done(null, false, req.flash('errorReset', 'Oops! Wrong password.'));
                }
                var hash = securePassword.hashAndSalt(req.body.newPassword);
                var passwordDetails = {
                    password: hash,
                    email: email,
                    userId: rows[0].userId
                };
                passportdb.resetPassword(passwordDetails, function(err, user) {
                    if (err) {
                        console.log('passport reset error', err)
                        return done(err, null, req.flash('errorReset', 'Incorrect information'));
                    }
                    return done(null, user, req.flash('successReset', 'Reset success'));
                });
            });
        }
      )
    );
};