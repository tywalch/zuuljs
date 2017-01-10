var deviceDB   = require('../models/devicedb');
var keyDB      = require('../models/keydb');
var profileDB  = require('../models/profiledb');
var errorLog   = require('../models/errordb');
var mainHelper = require('../../bin/helpers/controllerhelpers/mainhelper');

var getMain = function (req, res) {
  var reqDetails = {
    user: req.user
  };

  var successPage = function(reqDetails) {
    reqDetails.page = 'index';
    res.render('../views/partials/index', reqDetails);
  };

  var failurePage = function(reqDetails) {
    errorLog.addNewError(reqDetails);
    res.render('../views/partials/index', reqDetails);
  };
  deviceDB.getDeviceDetailsByOwner(reqDetails)
    .then(keyDB.getKeyDetailsByUser)
    .then(successPage)
    .catch(failurePage);
};

var getRegister = function(req, res) {
  res.render('../views/partials/register');
};

var getHelp = function(req, res) {
  reqDetails = {
    user: req.user
  };
  res.render('../views/partials/help', reqDetails);
};

var postRegister = function (req, res) {
  var reqDetails = {
    user: req.user
  };

  if (req.body.token) reqDetails.keyToken = (req.body.token).toLowerCase();
  reqDetails.particleToken = req.body.particleToken;

  var successPage = function(reqDetails) {
    if (reqDetails.tokenType === 'device') res.redirect('/device/' + reqDetails.deviceDetails.publicDeviceId);
    else if (reqDetails.tokenType === 'key') res.redirect('/key/' + reqDetails.keyDetails.publicKeyId);
    else res.redirect('/');
  };

  var failurePage = function(reqDetails) {
    errorLog.addNewError(reqDetails);
    res.redirect('/');
    //res.render('../views/partials/register', reqDetails);
  };

  mainHelper.keyTypeIdentifier(reqDetails)
    .then(mainHelper.validateByTokenType)
    .then(successPage)
    .catch(failurePage);
};


var getLogin = function(req, res) {
  res.render('../views/partials/login', {layout: 'intro.handlebars', message: req.flash('loginMessage')});
};

var postLogin = function(req, res) {
  res.redirect('/');
};

var getSignUp = function(req, res) {
  res.render('../views/partials/signup', {layout: 'intro.handlebars', message: req.flash('signupMessage')});
};

var postSignUp = function(req, res) {
  res.redirect('/');
};

var getLogout = function(req, res) {
  req.logOut();
  res.redirect('/login');
};

var pageNotFound = (function(req, res){
  res.status(404);

  // respond with html page
  if (req.accepts('html')) {
    res.render('../views/partials/pagenotfound', { url: req.url, user: req.user });
    return;
  }

  // respond with json
  if (req.accepts('json')) {
    res.send({ error: 'Not found' });
    return;
  }

  // default to plain-text. send()
  res.type('txt').send('Not found');
});

module.exports= {
  getMain: getMain,

  getRegister: getRegister,
  postRegister: postRegister,

  getLogin: getLogin,
  postLogin: postLogin,

  getSignUp: getSignUp,
  postSignUp: postSignUp,

  getLogout: getLogout,

  pageNotFound: pageNotFound,

  getHelp: getHelp
};