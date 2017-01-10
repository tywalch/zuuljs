var accessDB = require('../../../lib/models/accessdb');

var verifyCreatorOwnerStatus = function(reqDetails){
    return new Promise(function (resolve) {
        if (reqDetails.deviceDetails.deviceCreatorId === reqDetails.user.userId) {
            reqDetails.deviceOwner = true;
            reqDetails.deviceCreator = true;
        }
        else if (reqDetails.deviceDetails.deviceUserId === reqDetails.user.userId) reqDetails.deviceOwner = true;

        resolve(reqDetails);
    });
};

var verifyCreatorOwnerStatusFromDeviceFunctionDetails = function(reqDetails){
    return new Promise(function (resolve) {
        if (reqDetails.deviceFunctionDetails.deviceCreatorId === reqDetails.user.userId) {
            reqDetails.deviceOwner = true;
            reqDetails.deviceCreator = true;
        }
        else if (reqDetails.deviceFunctionDetails.deviceUserId === reqDetails.user.userId) reqDetails.deviceOwner = true;

        resolve(reqDetails);
    });
};

var accessDetailsByUserStatus = function(reqDetails) {
    if (reqDetails.deviceCreator || reqDetails.deviceOwner) {
        return accessDB.getAccessDetailsByOwnerAndPublicDeviceId(reqDetails);
    }
    else {
        return new Promise(function (resolve) {
            resolve(reqDetails);
        });
    }
};


module.exports= {
    verifyCreatorOwnerStatus: verifyCreatorOwnerStatus,
    accessDetailsByUserStatus: accessDetailsByUserStatus,
    verifyCreatorOwnerStatusFromDeviceFunctionDetails: verifyCreatorOwnerStatusFromDeviceFunctionDetails
};