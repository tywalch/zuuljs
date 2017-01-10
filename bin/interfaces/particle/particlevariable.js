var Particle         = require('particle-api-js');
var particle         = new Particle();
var errorHelper = require('../../helpers/errorhelper');

var getParticleVariableValue = function (reqDetails) {
    return new Promise(function (resolve, reject) {

        var particleToken = reqDetails.deviceFunctionDetails.particleToken;
        var particleDeviceId = reqDetails.deviceFunctionDetails.particleDeviceId;
        var particleVariableName = reqDetails.deviceFunctionDetails.particleFunctionVariable;

        particle.getVariable({
            deviceId: particleDeviceId,
            name: particleVariableName,
            auth: particleToken
        }).then(function (data) {
            if (data) {
                reqDetails.particleVariableDetails = data.body.result;
                resolve(reqDetails);
            } else {
                reject(reqDetails);
            }
        }).catch(function(err) {
            reqDetails.errorDetails = errorHelper.particle(err);
            reject(reqDetails);
        });
    });
};

module.exports = {
    getParticleVariableValue: getParticleVariableValue
};

