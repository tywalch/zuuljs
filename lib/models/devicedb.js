var zuuldb         = require('../../config/database').zuuldb;
var dbUtil         = require('../../bin/utilities/databaseutil');
var tokenGenerator = require('../../bin/utilities/tokengenerator');
var errorHelper    = require('../../bin/helpers/errorhelper');

var verifyDeviceDetailsByMakerAndPublicDeviceId = (function(reqDetails) {
  console.log('verifyDeviceDetailsByMakerAndPublicDeviceId');
  var details = {
    userId: reqDetails.user.userId,
    publicDeviceId: reqDetails.req.publicDeviceId
  };
  var verifyDeviceDetails = dbUtil.verifyDetails('deviceDetails',reqDetails);
  return zuuldb.vParticleDeviceKeyDetails.scope({ method: ['byMakerAndPublicDeviceId', details]})
    .findOne({})
    .then(verifyDeviceDetails)
    .catch(dbUtil.databaseError)
});

var verifyDeviceDetailsByOwnerAndPublicDeviceId = (function(reqDetails) {
  console.log('verifyDeviceDetailsByOwnerAndPublicDeviceId');
  var details = {
    userId: reqDetails.user.userId,
    publicDeviceId: reqDetails.req.publicDeviceId
  };
  var verifyDeviceDetails = dbUtil.verifyDetails('deviceDetails',reqDetails);
  return zuuldb.vParticleDeviceKeyDetails.scope({ method: ['byOwnerAndPublicDeviceId', details]})
    .findOne({})
    .then(verifyDeviceDetails)
    .catch(dbUtil.databaseError)
});

var verifyOnlyDeviceDetailsByOwnerAndPublicDeviceId = (function(reqDetails) {
  console.log('verifyOnlyDeviceDetailsByOwnerAndPublicDeviceId');
  var details = {
    userId: reqDetails.user.userId,
    publicDeviceId: reqDetails.req.publicDeviceId
  };
  var verifyDeviceDetails = dbUtil.verifyDetails('deviceDetails',reqDetails);
  return zuuldb.vDeviceDetails.scope({ method: ['byOwnerAndPublicDeviceId', details]})
    .findOne({})
    .then(verifyDeviceDetails)
    .catch(dbUtil.databaseError)
});

var verifyDeviceDetailsByUserAndPublicDeviceId = (function(reqDetails) {
  console.log('verifyDeviceDetailsByUserAndPublicDeviceId');
  var details = {
    userId: reqDetails.user.userId,
    publicDeviceId: reqDetails.req.publicDeviceId
  };
  var verifyDeviceDetails = dbUtil.verifyDetails('deviceDetails',reqDetails);
  return zuuldb.vParticleDeviceKeyDetails.scope({ method: ['byUserAndPublicDeviceId', details]})
    .findOne({})
    .then(verifyDeviceDetails)
    .catch(dbUtil.databaseError)
});

var getDeviceDetailsByOwner = (function(reqDetails) {
  console.log('getDeviceDetailsByOwner');
  var details = {
    userId: reqDetails.user.userId
  };
  var getDeviceDetails = dbUtil.amendDetails('deviceDetails',reqDetails);
  return zuuldb.vDeviceDetails.scope({ method: ['byOwner', details]})
    .findAll({})
    .then(getDeviceDetails)
    .catch(dbUtil.databaseError)
});

var verifyDeviceToken = (function(reqDetails) {
  console.log('verifyDeviceToken');
  var token = reqDetails.deviceToken;

  var verifyDeviceDetails = dbUtil.verifyDetails('deviceDetails',reqDetails);
  return zuuldb.vVerifyDeviceToken.scope({ method: ['byToken', token]})
    .findOne({})
    .then(verifyDeviceDetails)
    .catch(dbUtil.databaseError)
});

var registerNewDevice = function(reqDetails) {
  console.log('registerNewDevice');
  var registrationDetails = {
    userId: reqDetails.user.userId
  };
  var updateRegistrationDetails = dbUtil.updateDetails('registrationDetails',reqDetails);
  return zuuldb.device.update(registrationDetails, {where: {deviceId: reqDetails.deviceDetails.deviceId}})
    .then(updateRegistrationDetails)
    .catch(dbUtil.databaseError)
};

var addNewDevice = function(reqDetails) {
  console.log('addNewDevice');
  var deviceToken = tokenGenerator.newDeviceToken();
  var publicDeviceId = tokenGenerator.newPublicId();
  var privateDeviceId = tokenGenerator.newPrivateId();
  var dateCreated = new Date();
  var newDeviceDetails = {
    deviceName: reqDetails.req.deviceName,
    deviceDescription: reqDetails.req.deviceDescription,
    dateCreated: dateCreated,
    particleDeviceId: reqDetails.req.particleDeviceId,
    deviceToken: deviceToken,
    creatorId: reqDetails.user.userId,
    publicDeviceId: publicDeviceId,
    privateDeviceId: privateDeviceId,
    particleDeviceName: reqDetails.req.particleName
  };

  var insertDeviceDetails = dbUtil.insertDetails('deviceDetails',reqDetails);
  return zuuldb.device.create(newDeviceDetails)
    .then(insertDeviceDetails)
    .catch(dbUtil.databaseError)
};

var registerNewDevice = function(reqDetails) {
  console.log('registerNewDevice');
  var registrationDetails = {
    userId: reqDetails.user.userId
  };
  var updateRegistrationDetails = dbUtil.updateDetails('registrationDetails',reqDetails);
  return zuuldb.device.update(registrationDetails, {where: {deviceId: reqDetails.deviceDetails.deviceId}})
    .then(updateRegistrationDetails)
    .catch(dbUtil.databaseError)
};

var addLastStatus = function(reqDetails) {
  console.log('addLastStatus');

  var statusDetails = {
    lastStatus: reqDetails.particleDeviceDetails.connected
  };
  var passThruReqDetails = dbUtil.passThruDetails(reqDetails);
  return zuuldb.device.update(statusDetails, {where: {publicDeviceId: reqDetails.deviceDetails.publicDeviceId}})
    .then(passThruReqDetails)
    .catch(dbUtil.databaseError)
};

var editDevice = function(reqDetails) {
  console.log('editDevice');
  var editDeviceDetails = {
    deviceName: reqDetails.req.deviceName,
    deviceDescription: reqDetails.req.deviceDescription
  };
  var passThruReqDetails = dbUtil.passThruDetails(reqDetails);
  return zuuldb.device.update(editDeviceDetails, {where: {publicDeviceId: reqDetails.deviceDetails.publicDeviceId}})
    .then(passThruReqDetails)
    .catch(dbUtil.databaseError)
};

var deleteDevice = function(reqDetails) {
  console.log('deleteDevice');
  var passThruReqDetails = dbUtil.passThruDetails(reqDetails);
  return zuuldb.device.destroy({where: {publicDeviceId: reqDetails.deviceDetails.publicDeviceId}})
    .then(passThruReqDetails)
    .catch(dbUtil.databaseError)
};

module.exports = {
  getDeviceDetailsByOwner: getDeviceDetailsByOwner,
  verifyDeviceToken: verifyDeviceToken,
  registerNewDevice: registerNewDevice,
  addNewDevice: addNewDevice,
  editDevice: editDevice,
  deleteDevice: deleteDevice,
  verifyDeviceDetailsByOwnerAndPublicDeviceId: verifyDeviceDetailsByOwnerAndPublicDeviceId,
  verifyOnlyDeviceDetailsByOwnerAndPublicDeviceId: verifyOnlyDeviceDetailsByOwnerAndPublicDeviceId,
  verifyDeviceDetailsByUserAndPublicDeviceId: verifyDeviceDetailsByUserAndPublicDeviceId,
  verifyDeviceDetailsByMakerAndPublicDeviceId: verifyDeviceDetailsByMakerAndPublicDeviceId,
  addLastStatus: addLastStatus
};
