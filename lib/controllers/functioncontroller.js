var deviceDB         = require('../models/devicedb');
var functionDB       = require('../models/functiondb');
var accessDB       = require('../models/accessdb');
var errorLog         = require('../models/errordb');
var particleFunction = require('../../bin/interfaces/particle/particlefunction');
var particleVariable = require('../../bin/interfaces/particle/particlevariable');
var particleDevice   = require('../../bin/interfaces/particle/particledevice');
var functionValidation = require('../../bin/helpers/postvalidation/functionvalidation');
var functionHelper   = require('../../bin/helpers/controllerhelpers/functionhelper');
var keyHelper = require('../../bin/helpers/controllerhelpers/keyhelper');
var particleHelper   = require('../../bin/helpers/controllerhelpers/particlehelper');
var permissionsHelper   = require('../../bin/helpers/controllerhelpers/accesshelper');
var tsHelper   = require('../../bin/helpers/controllerhelpers/tshelper');

var getNew = function (req, res) {
  res.redirect('/');
};

var getNewPublicDeviceId = function (req, res) {
  var reqDetails = {
    req: req.params,
    user: req.user
  };

  var successPage = function(reqDetails) {
    res.render('../views/partials/function/newfunction', {reqDetails: reqDetails});
  };

  var failurePage = function(reqDetails) {
    res.redirect('/');
  };

  deviceDB.verifyDeviceDetailsByMakerAndPublicDeviceId(reqDetails)
    .then(particleDevice.getDeviceDetailsByParticleTokenAndParticleDeviceId)
    .then(permissionsHelper.verifyCreatorOwnerStatus)
    .then(functionHelper.parseFunctionAndVariableData)
    .then(functionHelper.getNewFunctionFormDetails)
    .then(successPage)
    .catch(failurePage);
};

var postNew = function (req, res) {
  var reqDetails = {
    req: req.body,
    user: req.user
  };

  var successPage = function(reqDetails) {
    res.redirect('/device/'+reqDetails.req.publicDeviceId);
  };

  var failurePage = function(reqDetails) {
    errorLog.addNewError(reqDetails);
    res.redirect('/function/new/' + reqDetails.req.publicDeviceId);
  };

  functionValidation.postNew(reqDetails)
    .then(functionHelper.functionNameReconciliation)
    .then(deviceDB.verifyDeviceDetailsByOwnerAndPublicDeviceId)
    .then(functionDB.addNewFunction)
    .then(successPage)
    .catch(failurePage);
};

var getEditPublicDeviceFunctionId = function(req, res) {
  var reqDetails = {
    req: req.params,
    user: req.user
  };

  var successPage = function(reqDetails) {
    reqDetails.deviceDetails = reqDetails.deviceFunctionDetails;
    res.render('../views/partials/function/newfunction', {
      reqDetails: reqDetails,
      user: reqDetails.user,
      edit: true
    });
  };

  var failurePage = function(reqDetails) {
    errorLog.addNewError(reqDetails);
    res.redirect('/');
  };

  functionDB.verifyDeviceFunctionDetailsByMakerAndPublicDeviceFunctionId(reqDetails)
    .then(particleDevice.getDeviceDetailsFromDeviceFunctionDetails)
    //.then(permissionsHelper.verifyCreatorOwnerStatusFromDeviceFunctionDetails)
    .then(functionHelper.parseFunctionAndVariableData)
    .then(functionHelper.getNewFunctionFormDetails)
    .then(functionHelper.selectFunctionFormDetails)
    .then(successPage)
    .catch(failurePage);
};

var patchEditPublicDeviceFunctionId = function(req, res) {
  var reqDetails = {
    req: req.body,
    user: req.user
  };
  reqDetails.publicDeviceFunctionId = req.params.publicDeviceFunctionId;
  var successPage = function(reqDetails) {
    res.redirect('/device/'+reqDetails.req.publicDeviceId);
  };

  var failurePage = function(reqDetails) {
    errorLog.addNewError(reqDetails);
    res.redirect('/function/edit/' + reqDetails.req.publicDeviceId);
  };

  functionValidation.postNew(reqDetails)
    .then(functionHelper.functionNameReconciliation)
    .then(deviceDB.verifyDeviceDetailsByOwnerAndPublicDeviceId)
    .then(functionDB.editFunction)
    .then(successPage)
    .catch(failurePage);
};

var deletePublicDeviceFunctionId = function(req, res) {
  var reqDetails = {
    req: req.params,
    user: req.user
  };

  var successPage = function(reqDetails) {
    res.redirect('/device/' + reqDetails.deviceFunctionDetails.publicDeviceId);
  };

  var failurePage = function(reqDentails) {
    errorLog.addNewError(reqDetails);
    res.redirect('/function/edit/' + reqDetails.req.publicDeviceId);
  };

  functionDB.verifyDeviceFunctionDetailsByMakerAndPublicDeviceFunctionId(reqDetails)
    .then(functionDB.deleteFunction)
    .then(successPage)
    .catch(failurePage);
};

var getFunctionStatus = function(req, res) {
  if (req.xhr || req.accepts('json,html') === 'json') {
    var reqDetails = {
      req: req.params,
      user: req.user
    };

    var successPage = function(reqDetails) {
      res.send({success: true, functionStatus: reqDetails.particleVariableDetails});
    };

    var failurePage = function(reqDetails) {
      errorLog.addNewError(reqDetails);
      res.send({success: false, displayMessage: reqDetails.displayMessage});
    };

    functionDB.verifyDeviceFunctionDetailsByAllAndPublicDeviceFunctionId(reqDetails)
      .then(particleVariable.getParticleVariableValue)
      .then(successPage)
      .catch(failurePage);
  }
};

var postFunctionCall = function(req, res) {
  if (req.xhr || req.accepts('json,html') === 'json') {
    var reqDetails = {
      req: req.body,
      user: req.user
    };
    var successPage = function(reqDetails) {
      res.send({success: true, functionStatus: reqDetails.particleFunctionCallDetails.return_value});
    };

    var failurePage = function(reqDetails) {
      errorLog.addNewError(reqDetails);
      res.send({success: false, displayMessage: reqDetails.displayMessage});
    };

    functionDB.verifyDeviceFunctionDetailsByOwnerAndPublicDeviceFunctionId(reqDetails)
      .then(particleFunction.binaryFunctionCall)
      .then(accessDB.successAccessEntry)
      .then(successPage)
      .catch(failurePage);
  }
};

var deviceFunctionHandlers = (function(socket, io) {
  var switchFunctionCall = (function(data) {
    var req = {
      publicDeviceFunctionId: data.room,
      publicKeyId: data.publicKeyId,
      functionType: 'switch'
    };

    var reqDetails = {
      req: req,
      user: socket.request.session.passport.user
    };

    var successPage = function(reqDetails) {
      var deviceDetails = {
        success: true,
        deviceFunctionId: reqDetails.deviceFunctionDetails.publicDeviceFunctionId,
        currentStatus: reqDetails.particleFunctionCallDetails.return_value,
        functionType: reqDetails.req.functionType,
        keyStatus: reqDetails.keyStatus
      };
      io.to(deviceDetails.deviceFunctionId).emit('functionStatusChange', deviceDetails);
    };

    var failurePage = function(errorDetails) {
      //errorLog.addNewError(errorDetails);
      var deviceDetails = {
        success: false,
        deviceFunctionId: reqDetails.req.publicDeviceFunctionId,
        functionType: reqDetails.req.functionType,
        keyStatus: reqDetails.keyStatus
      };
      io.to(req.publicDeviceFunctionId).emit('functionStatusChange', deviceDetails);
    };

    functionDB.verifyKeyFunctionDetailsbyUserAndPublicKeyIdOrPublicDeviceFunctionId(reqDetails)
      .then(functionHelper.extractKeyDetails)
      .then(keyHelper.keyTermRouter)
      .then(particleFunction.binaryFunctionCall)
      .then(accessDB.successAccessEntry)
      .then(successPage)
      .catch(failurePage);
  });


  var stringFunctionCall = (function (data) {
    var req = {
      inputValueDetails: data.message,
      publicDeviceFunctionId: data.room,
      publicKeyId: data.publicKeyId,
      functionType: 'string'
    };

    var reqDetails = {
      req: req,
      user: socket.request.session.passport.user
    };

    var successPage = function(reqDetails) {
      var deviceDetails = {
        success: true,
        deviceFunctionId: reqDetails.deviceFunctionDetails.publicDeviceFunctionId,
        currentStatus: reqDetails.particleFunctionCallDetails.return_value,
        functionType: reqDetails.req.functionType,
        keyStatus: reqDetails.keyStatus
      };
      io.to(deviceDetails.deviceFunctionId).emit('functionStatusChange', deviceDetails);
    };

    var failurePage = function(errorDetails) {
      errorLog.addNewError(errorDetails);
      var deviceDetails = {
        success: false,
        deviceFunctionId: reqDetails.req.publicDeviceFunctionId,
        functionType: reqDetails.req.functionType,
        keyStatus: reqDetails.keyStatus
      };
      io.to(reqDetails.req.publicDeviceFunctionId).emit('functionStatusChange', deviceDetails);
    };

    functionDB.verifyKeyFunctionDetailsbyUserAndPublicKeyIdOrPublicDeviceFunctionId(reqDetails)
      .then(functionHelper.extractKeyDetails)
      .then(keyHelper.keyTermRouter)
      .then(particleFunction.valueFunctionCall)
      .then(accessDB.successAccessEntry)
      .then(successPage)
      .catch(failurePage);
  });

  var numericFunctionCall = (function (data) {
    var req = {
      inputValueDetails: data.message,
      publicDeviceFunctionId: data.room,
      publicKeyId: data.publicKeyId,
      functionType: 'numeric'
    };

    var reqDetails = {
      req: req,
      user: socket.request.session.passport.user
    };

    var successPage = function(reqDetails) {
      var deviceDetails = {
        success: true,
        deviceFunctionId: reqDetails.deviceFunctionDetails.publicDeviceFunctionId,
        currentStatus: reqDetails.particleFunctionCallDetails.return_value,
        functionType: reqDetails.req.functionType,
        keyStatus: reqDetails.keyStatus
      };
      io.to(reqDetails.deviceFunctionDetails.deviceFunctionId).emit('functionStatusChange', deviceDetails);
    };

    var failurePage = function(errorDetails) {
      errorLog.addNewError(errorDetails);
      var deviceDetails = {
        success: false,
        deviceFunctionId: reqDetails.req.publicDeviceFunctionId,
        functionType: reqDetails.req.functionType,
        keyStatus: reqDetails.keyStatus
      };
      io.to(reqDetails.req.publicDeviceFunctionId).emit('functionStatusChange', deviceDetails);
    };

    functionDB.verifyKeyFunctionDetailsbyUserAndPublicKeyIdOrPublicDeviceFunctionId(reqDetails)
      .then(functionHelper.extractKeyDetails)
      .then(keyHelper.keyTermRouter)
      .then(functionHelper.verifyFunctionCallValue)
      .then(particleFunction.valueFunctionCall)
      .then(accessDB.successAccessEntry)
      .then(successPage)
      .catch(failurePage);
  });

  var invocationFunctionCall = (function(data) {
    var req = {
      publicDeviceFunctionId: data.room,
      publicKeyId: data.publicKeyId,
      functionType: 'invocation'

    };

    var reqDetails = {
      req: req,
      user: socket.request.session.passport.user
    };

    var successPage = function(reqDetails) {
      var deviceDetails = {
        success: true,
        deviceFunctionId: reqDetails.deviceFunctionDetails.publicDeviceFunctionId,
        keyStatus: reqDetails.keyStatus,
        functionType: reqDetails.req.functionType
      };
      io.to(deviceDetails.deviceFunctionId).emit('functionStatusChange', deviceDetails);
    };

    var failurePage = function(errorDetails) {
      var deviceDetails = {
        success: false,
        deviceFunctionId: reqDetails.req.publicDeviceFunctionId,
        functionType: reqDetails.req.functionType,
        keyStatus: reqDetails.keyStatus
      };
      io.to(req.publicDeviceFunctionId).emit('functionStatusChange', deviceDetails);
    };

    functionDB.verifyKeyFunctionDetailsbyUserAndPublicKeyIdOrPublicDeviceFunctionId(reqDetails)
      .then(functionHelper.extractKeyDetails)
      .then(keyHelper.keyTermRouter)
      .then(particleFunction.binaryFunctionCall)
      .then(accessDB.successAccessEntry)
      .then(successPage)
      .catch(failurePage);
  });

  var functionSubscription = (function(data) {
    var req = {
      publicDeviceFunctionId: data.room,
      publicKeyId: data.publicKeyId
    };

    var reqDetails = {
      req: req,
      user: socket.request.session.passport.user
    };



    var initSubscription = function(reqDetails) {
      //console.log('functioncontroller 373', reqDetails);
      return new Promise(function (resolve) {
        socket.join(reqDetails.deviceFunctionDetails.publicDeviceFunctionId);
        resolve(reqDetails);
      });
    };

    var successResponse = function(reqDetails) {
      //socket.join(reqDetails.deviceFunctionDetails.publicDeviceFunctionId);
      //console.log('functioncontroller 384', reqDetails);
      if (data.functionType === 'string' || data.functionType === 'numeric') reqDetails.particleVariableDetails = "";
      var deviceDetails = {
        success: true,
        currentStatus: reqDetails.particleVariableDetails,
        deviceFunctionId: reqDetails.deviceFunctionDetails.publicDeviceFunctionId,
        functionType: data.functionType,
        keyStatus: reqDetails.keyStatus
      };
      io.to(reqDetails.deviceFunctionDetails.publicDeviceFunctionId).emit('functionStatusChange', deviceDetails);
    };

    var failurePage = function(errorDetails) {
      //console.log('functioncontroller 396', errorDetails);
      var deviceDetails = {
        success: false,
        deviceFunctionId: reqDetails.req.publicDeviceFunctionId,
        functionType: data.functionType,
        keyStatus: reqDetails.keyStatus
      };
      io.to(reqDetails.req.publicDeviceFunctionId).emit('functionStatusChange', deviceDetails);
    };

    functionDB.verifyKeyFunctionDetailsbyUserAndPublicKeyIdOrPublicDeviceFunctionId(reqDetails)
      .then(functionHelper.extractKeyDetails)
      .then(keyHelper.keyTermRouter)
      .then(initSubscription)
      .then(particleVariable.getParticleVariableValue)
      .then(successResponse)
      .catch(failurePage);
  });

  return {
    functionSubscription: socket.on('subscribe-function', functionSubscription),
    invocationFunctionCall: socket.on('invocation', invocationFunctionCall),
    numericFunctionCall: socket.on('numeric', numericFunctionCall),
    stringFunctionCall: socket.on('string', stringFunctionCall),
    switchFunctionCall: socket.on('switch', switchFunctionCall)
  }
});

module.exports = {
  getNew:               getNew,
  postNew:              postNew,
  getNewPublicDeviceId: getNewPublicDeviceId,
  getEditPublicDeviceFunctionId: getEditPublicDeviceFunctionId,
  patchEditPublicDeviceFunctionId: patchEditPublicDeviceFunctionId,
  deletePublicDeviceFunctionId: deletePublicDeviceFunctionId,
  getFunctionStatus: getFunctionStatus,
  postFunctionCall: postFunctionCall,
  deviceFunctionHandlers: deviceFunctionHandlers
};