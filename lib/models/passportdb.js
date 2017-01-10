var tokenGenerator = require('../../bin/utilities/tokengenerator');
var zuuldb         = require('../../config/database').zuuldb;
var dbUtil         = require('../../bin/utilities/databaseutil');

module.exports = {
    getUserById: function(userId, done) {
        var details = {
          userId: userId
        };
        //return zuuldb.vUserDetails.scope({ method: ['byUser', details]})
      return zuuldb.vUserDetails.scope({ method: ['byUser', details]})
          .findOne({})
          .then(function(userDetails) {
            done(null, userDetails.get())
          })
          .catch(function(errorDetails) {
            done(errorDetails, null)
          });
    },

    getUserByEmail: function(email, done) {
      console.log('getUserByEmail');
      var details = {
        email: email
      };
      //return zuuldb.vUserDetails.scope({ method: ['byEmail', details]})
      return zuuldb.vUserDetails.scope({ method: ['byEmail', details]})
        .findOne({})
        .then(function(userDetails) {
          var loginDetails = [];
          if (userDetails) {
            loginDetails.push(userDetails.get());
            done(null, loginDetails)
          } else {
            done(null, loginDetails);
          }

        })
        .catch(function(errorDetails) {
          done(errorDetails, null)
        });
    },

    insertNewUser: function(user, done) {
      console.log('insertNewUser');

      var publicUserId = tokenGenerator.newPublicId();
      var privateUserId = tokenGenerator.newPrivateId();

      var newUserDetails = {
        email: user.email,
        password: user.password,
        firstName: user.firstName,
        lastName: user.lastName,
        particleToken: user.particleToken,
        publicUserId: publicUserId,
        privateUserId: privateUserId
      };

      zuuldb.user.create(newUserDetails)
        .then(function(userDetails) {
          done(null, userDetails.get())
        })
        .catch(function(errorDetails) {
          done(errorDetails, null)
        });
    },

  resetPassword: function(user, done) {
    console.log('resetPassword');
    var newPasswordDetails = {
      password: user.password
    };
    zuuldb.user.update(newPasswordDetails, {where: {email: user.email}})
      .then(function(userDetails) {
        done(null, user)
      })
      .catch(function(errorDetails) {
        done(errorDetails, null)
      });
  }
};