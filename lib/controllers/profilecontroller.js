var profileDB    = require('../models/profiledb');
var errorLog = require('../models/errordb');

var getProfile = function(req, res) {
  var reqDetails = {
    user: req.user,
    message: req.query,
    successReset: req.flash('successReset'),
    errorReset: req.flash('errorReset')
  };

  var successPage = function(reqDetails) {
    res.render('../views/partials/profile', reqDetails);
  };

  var failurePage = function(reqDetails) {
    errorLog.addNewError(reqDetails);
    res.redirect('/');
  };

  profileDB.verifyUserDetailsByUser(reqDetails)
    .then(successPage)
    .catch(failurePage);
};

var postProfile = function(req, res) {
  var reqDetails = {
    user: req.user,
    req: req.body
  };

  var successPage = function(reqDetails) {
    res.redirect('/profile/?success=Save%20Successful');
  };

  var failurePage = function(errorDetails) {
    errorLog.addNewError(errorDetails);
    res.redirect('/profile/?error=Save%20Unsuccessful');
  };

  profileDB.verifyUserDetailsByUser(reqDetails)
    .then(profileDB.editProfile)
    .then(successPage)
    .catch(failurePage);
};

var postResetPassword = function(req, res) {
  var reqDetails = {
    user: req.user,
    req: req.body
  };

  var successPage = function(reqDetails) {
    res.redirect('/profile/?success=Save%20Successful');
  };

  var failurePage = function(errorDetails) {
    errorLog.addNewError(errorDetails);
    res.redirect('/profile/?error=Save%20Unsuccessful');
  };

  profileDB.verifyUserDetailsByUser(reqDetails)
    .then(profileDB.editProfile)
    .then(successPage)
    .catch(failurePage);
};

module.exports = {
  getProfile: getProfile,
  postProfile: postProfile,
  postResetPassword: postResetPassword
};