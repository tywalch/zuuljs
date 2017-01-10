var convertKeyDetails = (function(reqDetails) {
    return new Promise(function (resolve) {
        reqDetails.deviceDetails = reqDetails.keyDetails;
        resolve(reqDetails);
    });
});

var addPublicDeviceIdToReqFromKeyDetails = (function(reqDetails) {
    return new Promise(function (resolve) {
        reqDetails.req.publicDeviceId = reqDetails.keyDetails.publicDeviceId;
        resolve(reqDetails);
    });
});

module.exports = {
    convertKeyDetails: convertKeyDetails,
    addPublicDeviceIdToReqFromKeyDetails: addPublicDeviceIdToReqFromKeyDetails
};