var deviceDB         = require('../models/devicedb');
var keyDB            = require('../models/keydb');
var functionDB       = require('../models/functiondb');
var accessDB         = require('../models/accessdb');
var errorLog         = require('../models/errordb');
var particleDevice   = require('../../bin/interfaces/particle/particledevice');
var functionHelper   = require('../../bin/helpers/controllerhelpers/functionhelper');
var keyHelper        = require('../../bin/helpers/controllerhelpers/keyhelper');
var permissionHelper = require('../../bin/helpers/controllerhelpers/permissionhelper');
var accessHelper     = require('../../bin/helpers/controllerhelpers/accesshelper');

var getNew = function(req, res) {
  var reqDetails = {
    user: req.user
  };

  var successPage = function(reqDetails) {
    res.render('../views/partials/device/newdevice', reqDetails);
  };

  var failurePage = function(reqDetails) {
    errorLog.addNewError(reqDetails);
    res.redirect('/');
  };

  particleDevice.getDevicesByParticleToken(reqDetails)
    .then(successPage)
    .catch(failurePage);
};

var postNew = function(req, res) {
  var reqDetails = {
    req: req.body,
    user: req.user
  };

  var successPage = function(reqDetails) {
    res.render('../views/partials/device/newdevicetoken', reqDetails);
  };

  var failurePage = function(reqDetails) {
    errorLog.addNewError(reqDetails);
    res.redirect('/device/new');
  };

  particleDevice.verifyParticleDeviceIdByParticleTokenAndParticleDeviceId(reqDetails)
    .then(deviceDB.addNewDevice)
    .then(successPage)
    .catch(failurePage);
};

var getRegister = function(req, res) {
  res.render('../views/partials/register');
};

var postRegister = function (req, res) {
  var reqDetails = {
    deviceToken: (req.body.deviceToken).toLowerCase(),
    user: req.user
  };

  var successPage = function(reqDetails) {
    res.redirect('/device/' + reqDetails.deviceDetails.publicDeviceId);
  };

  var failurePage = function(reqDetails) {
    errorLog.addNewError(reqDetails);
    res.render('../views/partials/register', reqDetails);
  };

  deviceDB.verifyDeviceToken(reqDetails)
    .then(deviceDB.registerNewDevice)
    .then(successPage)
    .catch(failurePage);
};

var getPublicDeviceId = function (req, res) {
  var reqDetails = {
    req: req.params,
    user: req.user
  };
  var successPage = function(reqDetails) {
    reqDetails.page = 'device';
    console.log('devicecontroler 84', reqDetails);
    res.render('../views/partials/device/viewdevice', reqDetails);
  };

  var failurePage = function(reqDetails) {
    errorLog.addNewError(reqDetails);
    res.redirect('/');
  };

  deviceDB.verifyOnlyDeviceDetailsByOwnerAndPublicDeviceId(reqDetails)
    .then(keyDB.getKeyDetailsByOwnerAndPublicDeviceId)
    .then(keyHelper.keyExpirationFormat)
    .then(keyHelper.identifyUnusedKeys)
    .then(permissionHelper.verifyCreatorOwnerStatus)
    .then(functionDB.getDeviceFunctionDetailsByOwnerAndPublicDeviceId)
    .then(functionHelper.getFunctionControlDetails)
    .then(accessDB.getAccessDetailsByOwnerAndPublicDeviceId)
    .then(successPage)
    .catch(failurePage);
};

var deletePublicDeviceId = function (req, res) {
  var reqDetails = {
    req: req.params,
    user: req.user
  };

  var successPage = function(reqDetails) {
    res.redirect('/');
  };

  var failurePage = function(reqDetails) {
    errorLog.addNewError(reqDetails);
    res.redirect('/device/'+reqDetails.req.publicDeviceId+'/edit');
  };

  deviceDB.verifyDeviceDetailsByMakerAndPublicDeviceId(reqDetails)
    .then(deviceDB.deleteDevice)
    .then(successPage)
    .catch(failurePage);
};

var getDeviceStatus = function(req, res) {
  if (req.xhr || req.accepts('json,html') === 'json') {
    var reqDetails = {
      req: req.params,
      user: req.user
    };

    var successPage = function(reqDetails) {
      res.send({success: true, deviceConnected: reqDetails.particleDeviceDetails.connected});
    };

    var failurePage = function(reqDetails) {
      errorLog.addNewError(reqDetails);
      res.send({success: false, displayMessage: reqDetails.errorDetails.displayMessage});
    };

    deviceDB.verifyDeviceDetailsByOwnerAndPublicDeviceId(reqDetails)
      .then(particleDevice.getDeviceDetailsByParticleTokenAndParticleDeviceId)
      .then(successPage)
      .catch(failurePage);
  }
};

var getEditPublicDeviceId = function(req, res) {
  var reqDetails = {
    req: req.params,
    user: req.user
  };

  var successPage = function(reqDetails) {
    res.render('../views/partials/device/newdevice', {
      particleDeviceDetails: reqDetails.particleDeviceDetails,
      user: reqDetails.user,
      deviceDetails: reqDetails.deviceDetails,
      edit: true
    });
  };

  var failurePage = function(reqDetails) {
    errorLog.addNewError(reqDetails);
    res.redirect('/'+reqDetails.req.publicDeviceId);
  };

  deviceDB.verifyDeviceDetailsByMakerAndPublicDeviceId(reqDetails)
    .then(successPage)
    .catch(failurePage);
};

var postEditPublicDeviceId = function(req, res) {
  var reqDetails = {
    req: req.body,
    user:   req.user
  };
  reqDetails.req.publicDeviceId = req.params.publicDeviceId;

  var successPage = function(reqDetails) {
    res.redirect('/device/'+reqDetails.deviceDetails.publicDeviceId);
  };

  var failurePage = function(reqDetails) {
    errorLog.addNewError(reqDetails);
    res.redirect('/device/'+reqDetails.req.publicDeviceId);
  };

  deviceDB.verifyDeviceDetailsByMakerAndPublicDeviceId(reqDetails)
    .then(deviceDB.editDevice)
    .then(successPage)
    .catch(failurePage);

};


var deviceHandlers = (function(socket, io) {
  var deviceStatusRequest = (function(data) {
    var req = {
      publicDeviceId: data.room
    };

    var reqDetails = {
      req: req,
      user: socket.request.session.passport.user
    };

    var successResponse = function(reqDetails) {
      var deviceDetails = {
        success: true,
        publicDeviceId: reqDetails.deviceDetails.publicDeviceId,
        currentStatus: reqDetails.particleDeviceDetails.connected
      };
      io.to(deviceDetails.publicDeviceId).emit('deviceStatusUpdate', deviceDetails);
    };

    var failureResponse = function(reqDetails) {
      errorLog.addNewError(reqDetails);
      var deviceDetails = {
        success: false,
        publicDeviceId: reqDetails.deviceDetails.publicDeviceId
      };
      io.to(deviceDetails.publicDeviceId).emit('deviceStatusUpdate', deviceDetails);
    };

    deviceDB.verifyDeviceDetailsByOwnerAndPublicDeviceId(reqDetails)
      .then(particleDevice.getDeviceDetailsByParticleTokenAndParticleDeviceId)
      .then(deviceDB.addLastStatus)
      .then(successResponse)
      .catch(failureResponse);
  });

  var deviceStatusInitialRequest = (function(reqDetails) {
    var successResponse = function(reqDetails) {
      var deviceDetails = {
        success: true,
        publicDeviceId: reqDetails.deviceDetails.publicDeviceId,
        currentStatus: reqDetails.particleDeviceDetails.connected
      };
      io.to(deviceDetails.publicDeviceId).emit('deviceStatusUpdate', deviceDetails);
    };

    var failureResponse = function(reqDetails) {
      errorLog.addNewError(reqDetails);
      var deviceDetails = {
        success: false
      };
      io.to(deviceDetails.publicDeviceId).emit('deviceStatusUpdate', deviceDetails);
    };

    particleDevice.getDeviceDetailsByParticleTokenAndParticleDeviceId(reqDetails)
      .then(deviceDB.addLastStatus)
      .then(successResponse)
      .catch(failureResponse);

  });

  var deviceSubscription = (function(data) {
    var req = {
      publicDeviceId: data
    };

    var reqDetails = {
      req: req,
      user: socket.request.session.passport.user
    };

    var successResponse = function(reqDetails) {
      socket.join(reqDetails.deviceDetails.publicDeviceId);
      deviceStatusInitialRequest(reqDetails);
    };

    var failureResponse = function(reqDetails) {

    };

    deviceDB.verifyDeviceDetailsByOwnerAndPublicDeviceId(reqDetails)
      .then(successResponse)
      .catch(failureResponse)
  });

  return {
    deviceSubscription: socket.on('subscribe-device', deviceSubscription),
    deviceStatusRequest: socket.on('deviceStatusRequest', deviceStatusRequest)
  }
});

module.exports= {

  getNew: getNew,
  postNew: postNew,

  getRegister: getRegister,
  postRegister: postRegister,

  getPublicDeviceId: getPublicDeviceId,
  deletePublicDeviceId: deletePublicDeviceId,

  getEditPublicDeviceId: getEditPublicDeviceId,
  postEditPublicDeviceId: postEditPublicDeviceId,

  getDeviceStatus: getDeviceStatus,

  deviceHandlers: deviceHandlers
};