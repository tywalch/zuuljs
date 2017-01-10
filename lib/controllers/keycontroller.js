var deviceDB         = require('../models/devicedb');
var functionDB       = require('../models/functiondb');
var keyDB            = require('../models/keydb');
var errorLog         = require('../models/errordb');
var functionHelper   = require('../../bin/helpers/controllerhelpers/functionhelper');
var keyHelper        = require('../../bin/helpers/controllerhelpers/keyhelper');
var deviceHelper     = require('../../bin/helpers/controllerhelpers/devicehelper');
var tsHelper         = require('../../bin/helpers/controllerhelpers/tshelper');
var particleDevice   = require('../../bin/interfaces/particle/particledevice');

var getNew = function (req, res) {
  res.redirect('/');
};

var getNewPublicDeviceId = function (req, res) {
  var reqDetails = {
    req: req.params,
    user:   req.user
  };

  var successPage = function(reqDetails) {
    res.render('../views/partials/key/newkey', reqDetails)
  };

  var failurePage = function(reqDetails) {
    errorLog.addNewError(reqDetails);
    res.redirect('/');
  };

  deviceDB.verifyDeviceDetailsByOwnerAndPublicDeviceId(reqDetails)
    .then(functionDB.getDeviceFunctionDetailsByOwnerAndPublicDeviceId)
    .then(keyHelper.getNewKeyFormDetails)
    .then(successPage)
    .catch(failurePage);
};

var getEditPublicKeyId = function (req, res) {
  var reqDetails = {
    req: req.params,
    user:   req.user
  };

  var successPage = function(reqDetails) {
    reqDetails.edit = true;
    reqDetails.deviceDetails = reqDetails.keyDetails;
    res.render('../views/partials/key/newkey', reqDetails)
  };

  var failurePage = function(reqDetails) {
    errorLog.addNewError(reqDetails);
    res.redirect('/');
  };

  keyDB.verifyKeyDetailsByOwnerAndPublicKeyId(reqDetails)
    .then(deviceHelper.addPublicDeviceIdToReqFromKeyDetails)
    .then(functionDB.getDeviceFunctionDetailsByOwnerAndPublicDeviceId)
    .then(keyDB.getKeyFunctionAssignmentsByKeyId)
    .then(functionHelper.selectFunctionsForEditKey)
    .then(keyHelper.selectTimezone)
    .then(keyHelper.getEditFormDetails)
    .then(successPage)
    .catch(failurePage);
};

var postEditPublicKeyId = function (req, res) {
  var reqDetails = {
    req: req.body,
    user: req.user
  };

  var successPage = function () {
    res.redirect('/device/'+reqDetails.keyDetails.publicDeviceId);
  };

  var failurePage = function (reqDetails) {
    errorLog.addNewError(reqDetails);
    res.redirect('/key/edit/'+reqDetails.keyDetails.publicKeyId);
  };

  /**
   I need to reference a single "device function" in the next promise function, so I am
   updating the original reqDetails so I can reference it later on. I don't like this
   because it is the only place in this whole application where I do this, but
   bluebird was acting like jerk.*/
  var separateSelectedFunctions = function (details) {
    return new Promise(function (resolve) {
      reqDetails = details;
      if (typeof reqDetails.req.selectedFunctions === 'string') {
        reqDetails.req.selectedFunctions = [reqDetails.req.selectedFunctions];
      }
      resolve(reqDetails.req.selectedFunctions);
    });
  };

  keyDB.verifyParticleDeviceDetailsByAllAndPublicKeyId(reqDetails)
    .then(functionDB.deleteKeyFunctionAssignmentsByKeyId)
    .then(keyDB.editKey)
    .then(separateSelectedFunctions)
    .each(function(selectedFunction){
      var deviceFunctionId = functionDB.getDeviceFunctionId(selectedFunction);
      deviceFunctionId.then(function(deviceFunctionIdValue){
        reqDetails.deviceFunctionId = deviceFunctionIdValue;
        keyDB.addKeyFunctionAssignment(reqDetails);
      });
    })
    .then(successPage)
    .catch(failurePage);
};

var postNew = function (req, res) {
  var reqDetails = {
    req: req.body,
    user: req.user
  };

  var successPage = function () {
    console.log('keycontroller 117', reqDetails);
    res.render('../views/partials/key/newkeytoken', reqDetails);
  };

  var failurePage = function (reqDetails) {
    errorLog.addNewError(reqDetails);
    res.redirect('/key/new/'+reqDetails.keyDetails.publicKeyId);
  };

  /**
   I need to reference a single "device function" in the next promise function, so I am
   updating the original reqDetails so I can reference it later on. I don't like this
   because it is the only place in this whole application where I do this, but
   bluebird was acting like jerk.*/
  var separateSelectedFunctions = function (details) {
    return new Promise(function (resolve) {
      reqDetails = details;
      if (typeof reqDetails.req.selectedFunctions === 'string') {
        reqDetails.req.selectedFunctions = [reqDetails.req.selectedFunctions];
      }
      resolve(reqDetails.req.selectedFunctions);
    });
  };

  // I had to nest promises here, it wouldn't work for some reason. Sorry :(
  deviceDB.verifyDeviceDetailsByOwnerAndPublicDeviceId(reqDetails)
    .then(keyDB.addNewKey)
    .then(separateSelectedFunctions)
    .each(function(selectedFunction){
      var deviceFunctionId = functionDB.getDeviceFunctionId(selectedFunction);
      deviceFunctionId.then(function(deviceFunctionIdValue){
        reqDetails.deviceFunctionId = deviceFunctionIdValue;
        keyDB.addKeyFunctionAssignment(reqDetails);
      });
    })
    .then(successPage)
    .catch(failurePage);
};

var getRegister = function (req, res) {
  reqDetails = {
    user: req.user,
    message: req.flash('registerMessage')
  };
  res.render('../views/partials/key/registerkey', reqDetails);
};

var postRegister = function (req, res) {
  var reqDetails = {
    keyToken: (req.body.keyToken).toLowerCase(),
    user: req.user
  };

  var successPage = function(reqDetails) {
    res.redirect('/key/'+reqDetails.keyDetails.publicKeyId);
  };

  var failurePage = function(reqDetails) {
    errorLog.addNewError(reqDetails);
    res.render('../views/partials/register', reqDetails);
  };

  keyDB.verifyKeyToken(reqDetails)
    .then(keyDB.registerNewKey)
    .then(successPage)
    .catch(failurePage);
};


var getPublicKeyId = function (req, res) {
  var reqDetails = {
    req: req.params,
    user: req.user
  };

  var successPage = function(reqDetails) {
    reqDetails.page = 'key';
    res.render('../views/partials/key/viewkey', reqDetails);
  };

  var failurePage = function(reqDetails) {
    errorLog.addNewError(reqDetails);
    res.redirect('/');
  };

  keyDB.verifyKeyDetailsByAllAndPublicKeyId(reqDetails)
    .then(keyHelper.keyTermCheck)
    .then(functionDB.getDeviceFunctionDetailsByAllAndPublicKeyId)
    //.then(keyHelper.extractKeyTerms)
    .then(functionHelper.getFunctionControlDetails)
    .then(keyHelper.prepareKeyTermsForDisplay)
    .then(successPage)
    .catch(failurePage);
};


var deletePublicKeyId = function (req, res) {
  var reqDetails = {
    req: req.params,
    user: req.user
  };

  var successPage = function () {
    res.redirect('/device/'+reqDetails.keyDetails.publicDeviceId);
  };

  var failurePage = function (reqDetails) {
    errorLog.addNewError(reqDetails);
    res.redirect('/key/edit/'+reqDetails.keyDetails.publicKeyId);
  };

  keyDB.verifyKeyDetailsByOwnerAndPublicKeyId(reqDetails)
    .then(keyDB.deleteKey)
    .then(successPage)
    .catch(failurePage);
};

var keyHandlers = (function(socket, io) {
  var keyStatusRequest = (function(data) {
    var req = {
      publicKeyId: data.room
    };

    var reqDetails = {
      req: req,
      user: socket.request.session.passport.user
    };

    var successResponse = function(reqDetails) {
      var keyDetails = {
        success: true,
        publicKeyId: reqDetails.keyDetails.publicKeyId,
        currentStatus: reqDetails.particleDeviceDetails.connected,
        keyStatus: reqDetails.keyStatus
      };
      io.to(keyDetails.publicKeyId).emit('deviceStatusUpdate', keyDetails);
    };

    var failureResponse = function(reqDetails) {
      errorLog.addNewError(reqDetails);
      var keyDetails = {
        success: false,
        publicKeyId: reqDetails.keyDetails.publicKeyId,
        keyStatus: reqDetails.keyStatus
      };
      if (reqDetails.validKey === false) keyDetails.validKey = false;
      io.to(keyDetails.publicKeyId).emit('keyStatusUpdate', keyDetails);
    };

    keyDB.verifyParticleDeviceDetailsByAllAndPublicKeyId(reqDetails)
      .then(keyHelper.keyTermRouter)
      .then(deviceHelper.convertKeyDetails)
      .then(particleDevice.getDeviceDetailsByParticleTokenAndParticleDeviceId)
      .then(deviceDB.addLastStatus)
      .then(successResponse)
      .catch(failureResponse);
  });

  var keyStatusInitialRequest = (function(reqDetails) {
    var successResponse = function(reqDetails) {
      var keyDetails = {
        success: true,
        publicKeyId: reqDetails.keyDetails.publicKeyId,
        currentStatus: reqDetails.particleDeviceDetails.connected,
        keyStatus: reqDetails.keyStatus
      };
      io.to(keyDetails.publicKeyId).emit('keyStatusUpdate', keyDetails);
    };

    var failureResponse = function(reqDetails) {
      errorLog.addNewError(reqDetails);
      var keyDetails = {
        success: false,
        publicKeyId: reqDetails.keyDetails.publicKeyId,
        keyStatus: reqDetails.keyStatus
      };
      if (reqDetails.validKey === false) keyDetails.validKey = false;
      io.to(keyDetails.publicKeyId).emit('keyStatusUpdate', keyDetails);
    };
    deviceHelper.convertKeyDetails(reqDetails)
      .then(particleDevice.getDeviceDetailsByParticleTokenAndParticleDeviceId)
      .then(deviceDB.addLastStatus)
      .then(successResponse)
      .catch(failureResponse);
  });

  var keySubscription = (function(data) {
    var req = {
      publicKeyId: data
    };

    var reqDetails = {
      req: req,
      user: socket.request.session.passport.user
    };

    var determineSleepProbe = function(reqDetails) {
      return new Promise(function (resolve, reject) {
        if (reqDetails.keyStatus !== 'Active') { //TODO: find better way to show key is active, another field maybe?
          socket.join(reqDetails.keyDetails.publicKeyId + "-sleep");
          var keyDetails = {
            success: false,
            keyStatus: reqDetails.keyStatus,
            publicKeyId: reqDetails.keyDetails.publicKeyId,
            accessTimeStart: reqDetails.keyTermDetails.accessTimeStart
          };
          io.to(keyDetails.publicKeyId + "-sleep").emit('keyStatusUpdate', keyDetails);
          reject(reqDetails);
        } else {
          resolve(reqDetails);
        }
      });
    };

    var initSubscription = function(reqDetails) {
      return new Promise(function (resolve) {
        socket.join(reqDetails.keyDetails.publicKeyId);
        resolve(reqDetails);
      });
    };

    var successResponse = function(reqDetails) {
      keyStatusInitialRequest(reqDetails);
    };

    var failureResponse = function(reqDetails) {
      var keyDetails = {
        success: false,
        keyStatus: reqDetails.keyStatus,
        publicKeyId: reqDetails.keyDetails.publicKeyId
      };
      io.to(keyDetails.publicKeyId).emit('keyStatusUpdate', keyDetails);
    };

    keyDB.verifyParticleDeviceDetailsByAllAndPublicKeyId(reqDetails)
      .then(deviceHelper.convertKeyDetails)
      .then(keyHelper.keyTermRouter)
      .catch(determineSleepProbe)
      .then(initSubscription)
      .then(successResponse)
      .catch(failureResponse)
  });

  return {
    keySubscription: socket.on('subscribe-key', keySubscription),
    keyStatusRequest: socket.on('keyStatusRequest', keyStatusRequest)
  }
});


module.exports = {

  getNew: getNew,
  postNew: postNew,
  getNewPublicDeviceId: getNewPublicDeviceId,

  getEditPublicKeyId: getEditPublicKeyId,
  postEditPublicKeyId: postEditPublicKeyId,

  deletePublicKeyId: deletePublicKeyId,

  getRegister: getRegister,
  postRegister: postRegister,

  getPublicKeyId: getPublicKeyId,

  keyHandlers: keyHandlers
};