var keyDB = require('../../../lib/models/keydb');
var deviceDB = require('../../../lib/models/devicedb');
var profileDB = require('../../../lib/models/profiledb');
var particleDevice = require('../../interfaces/particle/particledevice');

var keyTypeIdentifier = (function(reqDetails) {
    return new Promise(function (resolve, reject) {
        if (reqDetails.particleToken) reqDetails.tokenType = 'particle';
        else if (reqDetails.keyToken[0] === 'd') reqDetails.tokenType = 'device';
        else if (reqDetails.keyToken[0] ==='k') reqDetails.tokenType = 'key';
        reqDetails.tokenType ? resolve(reqDetails) : reject(reqDetails);
    });
});

var validateByTokenType = (function(reqDetails) {
    if (reqDetails.tokenType === 'device') {
        reqDetails.deviceToken = reqDetails.keyToken;
        return (deviceDB.verifyDeviceToken(reqDetails)
                .then(deviceDB.registerNewDevice));
    }
    else if (reqDetails.tokenType === 'key') {
        return (keyDB.verifyKeyToken(reqDetails)
                .then(keyDB.registerNewKey));
    }
    else if (reqDetails.tokenType === 'particle') {
        return (particleDevice.verifyParticleToken(reqDetails)
                .then(profileDB.editParticleToken));
    }
    else {
        reject(reqDetails);
    }
});

module.exports = {
    keyTypeIdentifier: keyTypeIdentifier,
    validateByTokenType: validateByTokenType
};