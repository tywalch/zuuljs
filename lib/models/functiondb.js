var Promise        = require('bluebird');
var tokenGenerator = require('../../bin/utilities/tokengenerator');
var errorHelper    = require('../../bin/helpers/errorhelper');
var dbUtil         = require('../../bin/utilities/databaseutil');
var zuuldb         = require('../../config/database').zuuldb;
var databaseError = dbUtil.databaseError;

var getDeviceFunctionDetailsByMakerAndPublicKeyId = (function(reqDetails) {
    console.log('getDeviceFunctionDetailsByMakerAndPublicKeyId');
    var details = {
        userId: reqDetails.user.userId,
        publicKeyId: reqDetails.req.publicKeyId
    };
    var getDeviceFunctionDetails = dbUtil.amendDetails('deviceFunctionDetails',reqDetails);
    return zuuldb.vDeviceKeyFunctionDetails.scope({ method: ['byMakerAndPublicKeyId', details]})
        .findAll({})
        .then(getDeviceFunctionDetails)
        .catch(dbUtil.databaseError)
});

var getDeviceFunctionDetailsByOwnerAndPublicKeyId = (function(reqDetails) {
    console.log('getDeviceFunctionDetailsByOwnerAndPublicKeyId');
    var details = {
        userId: reqDetails.user.userId,
        publicKeyId: reqDetails.req.publicKeyId
    };
    var getDeviceFunctionDetails = dbUtil.amendDetails('deviceFunctionDetails',reqDetails);
    return zuuldb.vDeviceKeyFunctionDetails.scope({ method: ['byOwnerAndPublicKeyId', details]})
        .findAll({})
        .then(getDeviceFunctionDetails)
        .catch(dbUtil.databaseError)
});

var getDeviceFunctionDetailsByAllAndPublicKeyId = (function(reqDetails) {
    console.log('getDeviceFunctionDetailsByAllAndPublicKeyId');
    var details = {
        userId: reqDetails.user.userId,
        publicKeyId: reqDetails.req.publicKeyId
    };
    var getDeviceFunctionDetails = dbUtil.amendDetails('deviceFunctionDetails',reqDetails);
    return zuuldb.vDeviceKeyFunctionDetails.scope({ method: ['byAllAndPublicKeyId', details]})
      .findAll({})
      .then(getDeviceFunctionDetails)
      .catch(dbUtil.databaseError)
});

var getDeviceFunctionDetailsByUserAndPublicKeyId = (function(reqDetails) {
    console.log('getDeviceFunctionDetailsByUserAndPublicKeyId');
    var details = {
        userId: reqDetails.user.userId,
        publicKeyId: reqDetails.req.publicKeyId
    };
    var getDeviceFunctionDetails = dbUtil.amendDetails('deviceFunctionDetails',reqDetails);
    return zuuldb.vDeviceKeyFunctionDetails.scope({ method: ['byUserAndPublicKeyId', details]})
        .findAll({})
        .then(getDeviceFunctionDetails)
        .catch(dbUtil.databaseError)
});

var verifyDeviceFunctionsByOwnerAndPublicDeviceId = (function(reqDetails) {
    console.log('verifyDeviceFunctionsByOwnerAndPublicDeviceId');
    var details = {
        userId: reqDetails.user.userId,
        publicDeviceId: reqDetails.req.publicDeviceId
    };
    var verifyFunctionDetails = dbUtil.verifyDetails('deviceFunctionDetails',reqDetails);
    return zuuldb.vDeviceFunctionDetails.scope({ method: ['byOwnerAndPublicDeviceId', details]})
        .findOne({})
        .then(verifyFunctionDetails)
        .catch(dbUtil.databaseError)
});

var verifyDeviceFunctionsByUserAndPublicKeyId = (function(reqDetails) {
    console.log('verifyDeviceFunctionsByUserAndPublicKeyId');
    var details = {
        userId: reqDetails.user.userId,
        publicKeyId: reqDetails.req.publicKeyId
    };
    var verifyFunctionDetails = dbUtil.verifyDetails('deviceFunctionDetails',reqDetails);
    return zuuldb.vDeviceFunctionDetails.scope({ method: ['byUserAndPublicKeyId', details]})
        .findOne({})
        .then(verifyFunctionDetails)
        .catch(dbUtil.databaseError)
});

var getDeviceFunctionDetailsByMakerAndPublicDeviceId = (function(reqDetails) {
    console.log('getDeviceFunctionDetailsByMakerAndPublicDeviceId');
    var details = {
        userId: reqDetails.user.userId,
        publicDeviceId: reqDetails.req.publicDeviceId
    };
    var verifyFunctionDetails = dbUtil.amendDetails('deviceFunctionDetails',reqDetails);
    return zuuldb.vDeviceFunctionDetails.scope({ method: ['byMakerAndPublicDeviceId', details]})
        .findAll({})
        .then(verifyFunctionDetails)
        .catch(dbUtil.databaseError)
});

var getDeviceFunctionDetailsByOwnerAndPublicDeviceId = (function(reqDetails) {
    console.log('getDeviceFunctionDetailsByOwnerAndPublicDeviceId');
    var details = {
        userId: reqDetails.user.userId,
        publicDeviceId: reqDetails.req.publicDeviceId
    };
    var getDeviceFunctionDetails = dbUtil.amendDetails('deviceFunctionDetails',reqDetails);
    return zuuldb.vDeviceFunctionDetails.scope({ method: ['byOwnerAndPublicDeviceId', details]})
        .findAll({})
        .then(getDeviceFunctionDetails)
        .catch(dbUtil.databaseError)
});

var getDeviceFunctionDetailsByUserAndPublicDeviceId = (function(reqDetails) {
    console.log('getDeviceFunctionDetailsByUserAndPublicDeviceId');
    var details = {
        userId: reqDetails.user.userId,
        publicDeviceId: reqDetails.req.publicDeviceId
    };
    var getDeviceFunctionDetails = dbUtil.amendDetails('deviceFunctionDetails',reqDetails);
    return zuuldb.vDeviceKeyFunctionDetails.scope({ method: ['byUserAndPublicDeviceId', details]})
        .findAll({})
        .then(getDeviceFunctionDetails)
        .catch(dbUtil.databaseError)
});

var verifyDeviceFunctionDetailsByUserAndPublicDeviceFunctionId = (function(reqDetails) {
    console.log('verifyDeviceFunctionDetailsByUserAndPublicDeviceFunctionId');
    var details = {
        userId: reqDetails.user.userId,
        publicDeviceFunctionId: reqDetails.req.publicDeviceFunctionId
    };
    var verifyDeviceFunctionDetails = dbUtil.verifyDetails('deviceFunctionDetails',reqDetails);
    return zuuldb.vDeviceKeyFunctionDetails.scope({ method: ['byUserAndPublicDeviceFunctionId', details]})
        .findOne({})
        .then(verifyDeviceFunctionDetails)
        .catch(dbUtil.databaseError)
});

var verifyDeviceFunctionDetailsByAllAndPublicDeviceFunctionId = (function(reqDetails) {
    console.log('getDeviceFunctionDetailsByAllAndPublicDeviceFunctionId');
    var details = {
        userId: reqDetails.user.userId,
        publicDeviceFunctionId: reqDetails.req.publicDeviceFunctionId
    };
    var verifyDeviceFunctionDetails = dbUtil.verifyDetails('deviceFunctionDetails',reqDetails);
    return zuuldb.vDeviceKeyFunctionDetails.scope({ method: ['byAllAndPublicDeviceFunctionId', details]})
        .findOne({})
        .then(verifyDeviceFunctionDetails)
        .catch(dbUtil.databaseError)
});

var verifyDeviceFunctionDetailsByMakerAndPublicDeviceFunctionId = (function(reqDetails) {
    console.log('verifyDeviceFunctionDetailsByMakerAndPublicDeviceFunctionId');
    var details = {
        userId: reqDetails.user.userId,
        publicDeviceFunctionId: reqDetails.req.publicDeviceFunctionId
    };
    var verifyDeviceFunctionDetails = dbUtil.verifyDetails('deviceFunctionDetails',reqDetails);
    return zuuldb.vDeviceKeyFunctionDetails.scope({ method: ['byMakerAndPublicDeviceFunctionId', details]})
      .findOne({})
      .then(verifyDeviceFunctionDetails)
      .catch(dbUtil.databaseError)
});

var verifyDeviceFunctionDetailsByOwnerAndPublicDeviceFunctionId = (function(reqDetails) {
    console.log('getDeviceFunctionDetailsByOwnerAndPublicDeviceFunctionId');
    var details = {
        userId: reqDetails.user.userId,
        publicDeviceFunctionId: reqDetails.req.publicDeviceFunctionId
    };
    var verifyDeviceFunctionDetails = dbUtil.verifyDetails('deviceFunctionDetails',reqDetails);
    return zuuldb.vDeviceKeyFunctionDetails.scope({ method: ['byOwnerAndPublicDeviceFunctionId', details]})
      .findOne({})
      .then(verifyDeviceFunctionDetails)
      .catch(dbUtil.databaseError)
});

var getDeviceFunctionDetailsByUserAndPublicDeviceFunctionId = (function(reqDetails) {
    console.log('getDeviceFunctionDetailsByUserAndPublicDeviceFunctionId');
    var details = {
        userId: reqDetails.user.userId,
        publicDeviceFunctionId: reqDetails.req.publicDeviceFunctionId
    };
    var getDeviceFunctionDetails = dbUtil.amendDetails('deviceFunctionDetails',reqDetails);
    return zuuldb.vDeviceKeyFunctionDetails.scope({ method: ['byUserAndPublicDeviceFunctionId', details]})
        .findAll({})
        .then(getDeviceFunctionDetails)
        .catch(dbUtil.databaseError)
});

var getDeviceFunctionDetailsByMakerAndPublicDeviceFunctionId = (function(reqDetails) {
    console.log('getDeviceFunctionDetailsByMakerAndPublicFunctionId');
    var details = {
        userId: reqDetails.user.userId,
        publicDeviceFunctionId: reqDetails.req.publicDeviceFunctionId
    };
    var getDeviceFunctionDetails = dbUtil.amendDetails('deviceFunctionDetails',reqDetails);
    return zuuldb.vDeviceKeyFunctionDetails.scope({ method: ['byMakerAndPublicDeviceFunctionId', details]})
        .findAll({})
        .then(getDeviceFunctionDetails)
        .catch(dbUtil.databaseError)
});

var getDeviceFunctionDetailsByOwnerAndPublicDeviceFunctionId = (function(reqDetails) {
    console.log('getDeviceFunctionDetailsByOwnerAndPublicFunctionId');
    var details = {
        userId: reqDetails.user.userId,
        publicDeviceFunctionId: reqDetails.req.publicDeviceFunctionId
    };
    var getDeviceFunctionDetails = dbUtil.amendDetails('deviceFunctionDetails',reqDetails);
    return zuuldb.vDeviceKeyFunctionDetails.scope({ method: ['byOwnerAndPublicDeviceFunctionId', details]})
        .findAll({})
        .then(getDeviceFunctionDetails)
        .catch(dbUtil.databaseError)
});

var getDeviceFunctionId = (function(publicDeviceFunctionId) {
    var details = {
        publicDeviceFunctionId: publicDeviceFunctionId
    };

    return zuuldb.vPublicDeviceFunctionId.scope({ method: ['byPublicDeviceFunctionId', details]})
        .findAll({})
        .then(dbUtil.getPublicFunctionId)
        .catch(dbUtil.databaseError)
});

var verifyKeyFunctionDetailsbyUserAndPublicKeyIdOrPublicDeviceFunctionId = (function(reqDetails) {
    console.log('verifyKeyFunctionDetailsbyUserAndPublicKeyIdOrPublicDeviceFunctionId');
    var details = {
        userId: reqDetails.user.userId,
        publicKeyId: reqDetails.req.publicKeyId,
        publicDeviceFunctionId: reqDetails.req.publicDeviceFunctionId
    };
    var verifyKeyDetails = dbUtil.verifyDetails('deviceFunctionDetails',reqDetails);
    return zuuldb.vDeviceKeyFunctionDetails.scope({ method: ['byUserAndPublicKeyIdOrPublicDeviceFunctionId', details]})
      .findOne({})
      .then(verifyKeyDetails)
      .catch(dbUtil.databaseError)
});


var addNewFunction = function(reqDetails) {
    console.log('addNewFunction');
    var newFunctionDetails = {
        deviceId: reqDetails.deviceDetails.deviceId,
        functionName: reqDetails.req.functionName,
        functionDescription: reqDetails.req.functionDescription,
        particleFunctionName: reqDetails.req.particleFunctionName,
        functionDataType: reqDetails.req.functionDataType,
        particleFunctionVariable: reqDetails.req.particleVariableName,
        publicDeviceFunctionId: tokenGenerator.newPublicId(),
        privateDeviceFunctionId: tokenGenerator.newPrivateId()
    };

    var updateDeviceFunctionDetails = dbUtil.insertDetails('deviceFunctionDetails',reqDetails);
    return zuuldb.deviceFunction.create(newFunctionDetails)
      .then(updateDeviceFunctionDetails)
      .catch(databaseError)
};

var editFunction = function(reqDetails) {
    console.log('editFunction');
    var editFunctionDetails = {
        functionName: reqDetails.req.functionName,
        functionDescription: reqDetails.req.functionDescription,
        particleFunctionName: reqDetails.req.particleFunctionName,
        functionDataType: reqDetails.req.functionDataType,
        particleFunctionVariable: reqDetails.req.particleVariableName
    };

    var passThruReqDetails = dbUtil.passThruDetails(reqDetails);
    return zuuldb.deviceFunction.update(editFunctionDetails, {where: {publicDeviceFunctionId: reqDetails.req.publicDeviceFunctionId}})
      .then(passThruReqDetails)
      .catch(databaseError)
};

var deleteFunction = function(reqDetails) {
    console.log('deleteFunction');
    var passThruReqDetails = dbUtil.passThruDetails(reqDetails);
    return zuuldb.deviceFunction.destroy({where: {publicDeviceFunctionId: reqDetails.req.publicDeviceFunctionId}})
      .then(passThruReqDetails)
      .catch(databaseError)
};

var deleteKeyFunctionAssignmentsByKeyId = function(reqDetails) {
    console.log('deleteFunction');
    var passThruReqDetails = dbUtil.passThruDetails(reqDetails);
    return zuuldb.keyFunctionAssignment.destroy({where: {keyId: reqDetails.keyDetails.keyId}})
      .then(passThruReqDetails)
      .catch(databaseError)
};

module.exports = {
    verifyDeviceFunctionsByUserAndPublicKeyId: verifyDeviceFunctionsByUserAndPublicKeyId,
    getDeviceFunctionDetailsByMakerAndPublicKeyId: getDeviceFunctionDetailsByMakerAndPublicKeyId,
    getDeviceFunctionDetailsByOwnerAndPublicKeyId: getDeviceFunctionDetailsByOwnerAndPublicKeyId,
    getDeviceFunctionDetailsByUserAndPublicKeyId: getDeviceFunctionDetailsByUserAndPublicKeyId,
    getDeviceFunctionDetailsByAllAndPublicKeyId: getDeviceFunctionDetailsByAllAndPublicKeyId,

    verifyDeviceFunctionsByOwnerAndPublicDeviceId: verifyDeviceFunctionsByOwnerAndPublicDeviceId,
    getDeviceFunctionDetailsByMakerAndPublicDeviceId: getDeviceFunctionDetailsByMakerAndPublicDeviceId,
    getDeviceFunctionDetailsByOwnerAndPublicDeviceId: getDeviceFunctionDetailsByOwnerAndPublicDeviceId,
    getDeviceFunctionDetailsByUserAndPublicDeviceId: getDeviceFunctionDetailsByUserAndPublicDeviceId,

    verifyDeviceFunctionDetailsByAllAndPublicDeviceFunctionId: verifyDeviceFunctionDetailsByAllAndPublicDeviceFunctionId,
    verifyDeviceFunctionDetailsByMakerAndPublicDeviceFunctionId: verifyDeviceFunctionDetailsByMakerAndPublicDeviceFunctionId,
    verifyDeviceFunctionDetailsByOwnerAndPublicDeviceFunctionId: verifyDeviceFunctionDetailsByOwnerAndPublicDeviceFunctionId,
    verifyDeviceFunctionDetailsByUserAndPublicDeviceFunctionId: verifyDeviceFunctionDetailsByUserAndPublicDeviceFunctionId,
    getDeviceFunctionDetailsByMakerAndPublicDeviceFunctionId: getDeviceFunctionDetailsByMakerAndPublicDeviceFunctionId,
    getDeviceFunctionDetailsByOwnerAndPublicDeviceFunctionId: getDeviceFunctionDetailsByOwnerAndPublicDeviceFunctionId,
    getDeviceFunctionDetailsByUserAndPublicDeviceFunctionId: getDeviceFunctionDetailsByUserAndPublicDeviceFunctionId,
    getDeviceFunctionId: getDeviceFunctionId,

    verifyKeyFunctionDetailsbyUserAndPublicKeyIdOrPublicDeviceFunctionId: verifyKeyFunctionDetailsbyUserAndPublicKeyIdOrPublicDeviceFunctionId,

    addNewFunction: addNewFunction,
    editFunction: editFunction,
    deleteFunction: deleteFunction,
    deleteKeyFunctionAssignmentsByKeyId: deleteKeyFunctionAssignmentsByKeyId
};