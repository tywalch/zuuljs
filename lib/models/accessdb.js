var errorHelper = require('../../bin/helpers/errorhelper');
var Promise        = require('bluebird');
var zuuldb         = require('../../config/database').zuuldb;
var dbUtil         = require('../../bin/utilities/databaseutil');

var databaseError = dbUtil.databaseError;

var successAccessEntry = function(reqDetails) {
    console.log('successAccessEntry');
    var accessDetails = {
        deviceId: reqDetails.deviceFunctionDetails.deviceId,
        userId: reqDetails.user.userId,
        keyId: reqDetails.deviceFunctionDetails.keyId,
        requestState: reqDetails.req.inputValueDetails,
        responseState: reqDetails.particleFunctionCallDetails.return_value,
        accessSuccess: true,
        ipAddress: reqDetails.user.clientDetails.ipAddress,
        userAgent: reqDetails.user.clientDetails.userAgent,
        deviceFunctionId: reqDetails.deviceFunctionDetails.deviceFunctionId
    };
    var updateAccessDetails = dbUtil.insertDetails('accessDetails',reqDetails);
    return zuuldb.access.create(accessDetails)
      .then(updateAccessDetails)
      .catch(databaseError)
};

var failureAccessEntry = function(reqDetails) {
    console.log('failureAccessEntry');
    var accessDetails = {
        deviceId: reqDetails.deviceFunctionDetails.deviceId,
        userId: reqDetails.user.userId,
        keyId: reqDetails.deviceFunctionDetails.keyId,
        requestState: reqDetails.req.inputValueDetails,
        responseState: reqDetails.particleFunctionCallDetails.return_value,
        accessSuccess: true,
        ipAddress: reqDetails.user.clientDetails.ipAddress,
        userAgent: reqDetails.user.clientDetails.userAgent,
        deviceFunctionId: reqDetails.deviceFunctionDetails.deviceFunctionId
    };

    var updateAccessDetails = dbUtil.insertDetails('accessDetails',reqDetails);
    return zuuldb.access.create(accessDetails)
      .then(updateAccessDetails)
      .catch(databaseError)
};

var getAccessDetailsByOwnerAndPublicDeviceId = (function(reqDetails) {
    console.log('getAccessDetailsByDeviceIdAndUserId');
    var details = {
        userId: reqDetails.user.userId,
        publicDeviceId: reqDetails.deviceDetails.publicDeviceId
    };
    var getAccessDetails = dbUtil.amendDetails('accessDetails',reqDetails);
    return zuuldb.accessDetails.scope({ method: ['byOwnerAndPublicDeviceId', details]})
      .findAll({limit: 5})
      .then(getAccessDetails)
      .catch(databaseError)
});

module.exports = {
    successAccessEntry: successAccessEntry,
    failureAccessEntry: failureAccessEntry,
    getAccessDetailsByOwnerAndPublicDeviceId: getAccessDetailsByOwnerAndPublicDeviceId
};

