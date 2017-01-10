var verifyCreatorOwnerStatus = function(reqDetails){
    return new Promise(function (resolve) {
        if (reqDetails.deviceDetails.deviceCreatorId === reqDetails.user.userId || reqDetails.deviceDetails.creatorId === reqDetails.user.userId) {
            reqDetails.deviceOwner = true;
            reqDetails.deviceCreator = true;
        }
        else if (reqDetails.deviceDetails.deviceUserId === reqDetails.user.userId) reqDetails.deviceOwner = true;
        else reqDetails.keyUser = true;
        resolve(reqDetails);
    });
};

module.exports= {
    verifyCreatorOwnerStatus: verifyCreatorOwnerStatus
};