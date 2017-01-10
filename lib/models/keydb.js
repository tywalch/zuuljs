//var Promise        = require('bluebird');
var tokenGenerator = require('../../bin/utilities/tokengenerator');
var errorHelper    = require('../../bin/helpers/errorhelper');
var tsHelper    = require('../../bin/helpers/controllerhelpers/tshelper');
var dbUtil         = require('../../bin/utilities/databaseutil');
var zuuldb         = require('../../config/database').zuuldb;

var getKeyDetailsByOwnerAndPublicDeviceId = (function(reqDetails) {
  console.log('getKeyDetailsByOwnerAndPublicDeviceId');
  var details = {
    userId: reqDetails.user.userId,
    publicDeviceId: reqDetails.req.publicDeviceId
  };
  var getKeyDetails = dbUtil.amendDetails('keyDetails',reqDetails);
  return zuuldb.vDeviceKeyDetails.scope({ method: ['byOwnerAndPublicDeviceId', details]})
    .findAll({})
    .then(getKeyDetails)
    .catch(dbUtil.databaseError)
});

var getKeyDetailsByUser = (function(reqDetails) {
  console.log('getKeyDetailsByUser');
  var details = {
    userId: reqDetails.user.userId
  };
  var getKeyDetails = dbUtil.amendDetails('keyDetails',reqDetails);
  return zuuldb.vDeviceKeyDetails.scope({ method: ['byUser', details]})
    .findAll({})
    .then(getKeyDetails)
    .catch(dbUtil.databaseError)
});

var verifyKeyDetailsByUserAndPublicKeyId = (function(reqDetails) {
  console.log('verifyKeyDetailsByUserIdAndPublicKeyId');
  var details = {
    userId: reqDetails.user.userId,
    publicKeyId: reqDetails.req.publicKeyId
  };
  var verifyKeyDetails = dbUtil.verifyDetails('keyDetails',reqDetails);
  return zuuldb.vDeviceKeyDetails.scope({ method: ['byUserAndPublicKeyId', details]})
    .findOne({})
    .then(verifyKeyDetails)
    .catch(dbUtil.databaseError)
});


var verifyKeyDetailsByOwnerAndPublicKeyId = (function(reqDetails) {
  console.log('verifyKeyDetailsByUserIdAndPublicKeyId');
  var details = {
    userId: reqDetails.user.userId,
    publicKeyId: reqDetails.req.publicKeyId
  };
  var verifyKeyDetails = dbUtil.verifyDetails('keyDetails',reqDetails);
  return zuuldb.vDeviceKeyDetails.scope({ method: ['byOwnerAndPublicKeyId', details]})
    .findOne({})
    .then(verifyKeyDetails)
    .catch(dbUtil.databaseError)
});

var verifyKeyDetailsByAllAndPublicKeyId = (function(reqDetails) {
  console.log('verifyKeyDetailsByAllAndPublicKeyId');
  var details = {
    userId: reqDetails.user.userId,
    publicKeyId: reqDetails.req.publicKeyId
  };
  var verifyKeyDetails = dbUtil.verifyDetails('keyDetails',reqDetails);
  return zuuldb.vDeviceKeyDetails.scope({ method: ['byAllAndPublicKeyId', details]})
    .findOne({})
    .then(verifyKeyDetails)
    .catch(dbUtil.databaseError)
});

var getKeyTermsByUserAndPublicKeyId = (function(reqDetails) {
  console.log('getKeyTermsByUserIdAndPublicKeyId');
  var details = {
    userId: reqDetails.user.userId,
    publicKeyId: reqDetails.keyDetails.publicKeyId
  };
  var getKeyTermDetail = dbUtil.getOneDetail('keyTermDetails',reqDetails);
  return zuuldb.vVerifyKeyTerms.scope({ method: ['byUserAndPublicKeyId', details]})
    .findOne({})
    .then(getKeyTermDetail)
    .catch(dbUtil.databaseError)
});

var getKeyTermsByDeviceId = (function(reqDetails) {
  console.log('getKeyTermsByDeviceId');
  var details = {
    deviceId: reqDetails.deviceDetails.deviceId
  };
  var getKeyTermDetail = dbUtil.getOneDetail('keyTermDetails',reqDetails);
  return zuuldb.vVerifyKeyTerms.scope({ method: ['byDevice', details]})
    .findOne({})
    .then(getKeyTermDetail)
    .catch(dbUtil.databaseError)
});

var verifyKeyToken = (function(reqDetails) {
  console.log('verifyKeyToken');
  var token = reqDetails.keyToken;
  var verifyKeyToken = dbUtil.verifyDetails('keyDetails',reqDetails);
  return zuuldb.vVerifyKeyToken.scope({ method: ['byToken', token]})
    .findOne({})
    .then(verifyKeyToken)
    .catch(dbUtil.databaseError)
});

var registerNewKey = function(reqDetails) {
  console.log('registerNewKey');
  var registrationDetails = {
    userId: reqDetails.user.userId,
    registrationDate: new Date()
  };
  var passThruReqDetails = dbUtil.passThruDetails(reqDetails);
  return zuuldb.deviceKey.update(registrationDetails, {where: {keyId: reqDetails.keyDetails.keyId}})
    .then(passThruReqDetails)
    .catch(dbUtil.databaseError)
};

var addNewKey = function(reqDetails) {
  console.log('addNewKey');

  var keyDetails = reqDetails.req;
  var keyToken = tokenGenerator.newKeyToken();
  var publicKeyId = tokenGenerator.newPublicId();
  var privateKeyId = tokenGenerator.newPrivateId();
  var dateCreated = new Date();
  var newKeyDetails = {
    deviceId:             reqDetails.deviceDetails.deviceId,
    keyToken:             keyToken,
    dateCreated:          dateCreated,
    accessExpirationDate: keyDetails.expirationDate,
    accessActivationDate: keyDetails.activationDate,
    accessFrequency:      keyDetails.accessFrequency,
    accessFrequencyUnits: keyDetails.accessFrequencyUnits,
    accessTimeStart:      keyDetails.accessTimeStart,
    accessTimeEnd:        keyDetails.accessTimeEnd,
    creatorId:            reqDetails.user.userId,
    publicKeyId:          publicKeyId,
    privateKeyId:         privateKeyId,
    keyTimeZone:          keyDetails.keyTimeZone
  };
  var insertKeyDetails = dbUtil.insertDetails('keyDetails',reqDetails);
  return zuuldb.deviceKey.create(newKeyDetails)
    .then(insertKeyDetails)
    .catch(dbUtil.databaseError)
};

var editKey = function(reqDetails) {
  console.log('editKey');
  var keyDetails = reqDetails.req;
  var editKeyDetails = {
    accessExpirationDate: keyDetails.expirationDate,
    accessActivationDate: keyDetails.activationDate,
    accessFrequency:      keyDetails.accessFrequency,
    accessFrequencyUnits: keyDetails.accessFrequencyUnits,
    accessTimeStart:      keyDetails.accessTimeStart,
    accessTimeEnd:        keyDetails.accessTimeEnd,
    keyTimeZone:          keyDetails.keyTimeZone
  };
  var passThruReqDetails = dbUtil.passThruDetails(reqDetails);
  return zuuldb.deviceKey.update(editKeyDetails, {where: {keyId: reqDetails.keyDetails.keyId}})
    .then(passThruReqDetails)
    .catch(dbUtil.databaseError)
};

var deleteKey = function(reqDetails) {
  console.log('deleteKey');
  var passThruReqDetails = dbUtil.passThruDetails(reqDetails);
  return zuuldb.deviceKey.destroy({where: {publicKeyId: reqDetails.req.publicKeyId}})
    .then(passThruReqDetails)
    .catch(dbUtil.databaseError)
};

var addKeyFunctionAssignment = function(reqDetails) {
  console.log('addKeyFunctionAssignment');
  var newKeyFunctionAssignment = {
    deviceFunctionId: reqDetails.deviceFunctionId,
    keyId: reqDetails.keyDetails.keyId
  };
  //var insertKeyFunctionDetails = dbUtil.passThruDetails(reqDetails);
  var insertKeyFunctionDetails = dbUtil.passThruDetails(reqDetails);
  return zuuldb.keyFunctionAssignment.findOrCreate({where: newKeyFunctionAssignment})
    .then(insertKeyFunctionDetails)
    .catch(dbUtil.databaseError)
};

var deactivateKey = function(reqDetails) {
  console.log('deactivateKey');
  var keyDetails = reqDetails.req;
  var deactivateKeyDetails = {
    keyActive: 0
  };
  var passThruReqDetails = dbUtil.passThruDetails(reqDetails);
  return zuuldb.deviceKey.update(deactivateKeyDetails, {where: {keyId: reqDetails.keyDetails.keyId}})
    .then(passThruReqDetails)
    .catch(dbUtil.databaseError)
};

var verifyParticleDeviceDetailsByUserAndPublicKeyId = (function(reqDetails) {
  console.log('verifyParticleDeviceDetailsByUserAndPublicKeyId1111');
  var details = {
    userId: reqDetails.user.userId,
    publicKeyId: reqDetails.req.publicKeyId
  };
  var verifyKeyDetails = dbUtil.verifyDetails('keyDetails',reqDetails);
  return zuuldb.vParticleDeviceKeyDetails.scope({ method: ['byUserAndPublicKeyId', details]})
    .findOne({})
    .then(verifyKeyDetails)
    .catch(dbUtil.databaseError)
});

var verifyParticleDeviceDetailsByAllAndPublicKeyId = (function(reqDetails) {
  console.log('verifyParticleDeviceDetailsByAllAndPublicKeyId');
  var details = {
    userId: reqDetails.user.userId,
    publicKeyId: reqDetails.req.publicKeyId
  };
  var verifyKeyDetails = dbUtil.verifyDetails('keyDetails',reqDetails);
  return zuuldb.vParticleDeviceKeyDetails.scope({ method: ['byAllAndPublicKeyId', details]})
    .findOne({})
    .then(verifyKeyDetails)
    .catch(dbUtil.databaseError)
});

var verifyParticleDeviceDetailsByOwnerAndPublicKeyId = (function(reqDetails) {
  console.log('verifyParticleDeviceDetailsByOwnerAndPublicKeyId');
  var details = {
    userId: reqDetails.user.userId,
    publicKeyId: reqDetails.req.publicKeyId
  };
  var verifyKeyDetails = dbUtil.verifyDetails('keyDetails',reqDetails);
  return zuuldb.vParticleDeviceKeyDetails.scope({ method: ['byOwnerAndPublicKeyId', details]})
    .findOne({})
    .then(verifyKeyDetails)
    .catch(dbUtil.databaseError)
});

var getKeyFunctionAssignmentsByKeyId = (function(reqDetails) {
  console.log('getKeyFunctionAssignmentsByKeyId');
  var details = {
    keyId: reqDetails.keyDetails.keyId
  };
  var getKeyDetails = dbUtil.amendDetails('keyFunctionDetails',reqDetails);
  return zuuldb.keyFunctionAssignment.scope({ method: ['byKey', details]})
    .findAll({})
    .then(getKeyDetails)
    .catch(dbUtil.databaseError)
});

module.exports = {
  verifyKeyToken: verifyKeyToken,
  registerNewKey:  registerNewKey,
  addNewKey: addNewKey,
  deactivateKey: deactivateKey,
  addKeyFunctionAssignment: addKeyFunctionAssignment,
  editKey: editKey,
  deleteKey: deleteKey,

  getKeyFunctionAssignmentsByKeyId: getKeyFunctionAssignmentsByKeyId,

  getKeyTermsByUserAndPublicKeyId: getKeyTermsByUserAndPublicKeyId,
  getKeyTermsByDeviceId: getKeyTermsByDeviceId, // what is this? It is a strange niche
  verifyParticleDeviceDetailsByUserAndPublicKeyId: verifyParticleDeviceDetailsByUserAndPublicKeyId,
  verifyParticleDeviceDetailsByAllAndPublicKeyId: verifyParticleDeviceDetailsByAllAndPublicKeyId,
  verifyParticleDeviceDetailsByOwnerAndPublicKeyId: verifyParticleDeviceDetailsByOwnerAndPublicKeyId,
  verifyKeyDetailsByOwnerAndPublicKeyId: verifyKeyDetailsByOwnerAndPublicKeyId,
  verifyKeyDetailsByUserAndPublicKeyId: verifyKeyDetailsByUserAndPublicKeyId,
  verifyKeyDetailsByAllAndPublicKeyId: verifyKeyDetailsByAllAndPublicKeyId,

  getKeyDetailsByUser: getKeyDetailsByUser,
  getKeyDetailsByOwnerAndPublicDeviceId: getKeyDetailsByOwnerAndPublicDeviceId
};