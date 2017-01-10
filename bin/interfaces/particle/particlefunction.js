var Particle         = require('particle-api-js');
var Promise          = require('bluebird');
var errorHelper = require('../../helpers/errorhelper');
var particle         = new Particle();

var getFunctionNamesByParticleTokenAndParticleDeviceId = function (reqDetails) {
    var particleToken = reqDetails.user.particleToken;
    var particleDeviceId = reqDetails.deviceDetails.particleDeviceId;

    return new Promise(function (resolve, reject) {
        var devicesPr = particle.getDevice({deviceId: particleDeviceId, auth: particleToken});
        devicesPr.then(
            function (data) {
                reqDetails.particleFunctionDetails = data.body.functions;
                resolve(reqDetails);
            },
            function (err) {
                reqDetails.errorDetails = errorHelper.particle(err);
                reject(reqDetails);
            }
        );
    });
};

var binaryFunctionCall = function(reqDetails) {
    var particleDeviceId = reqDetails.deviceFunctionDetails.particleDeviceId;
    var particleToken = reqDetails.deviceFunctionDetails.particleToken;
    var functionName = reqDetails.deviceFunctionDetails.particleFunctionName;
    var callDetails = "";

    return new Promise(function (resolve, reject) {
        var fnPr = particle.callFunction({
            deviceId: particleDeviceId,
            name: functionName,
            argument: callDetails,
            auth: particleToken
        });
        fnPr.then(
            function (data) {
                reqDetails.particleFunctionCallDetails = data.body;
                resolve(reqDetails);
            },
            function (err) {
                reqDetails.errorDetails = errorHelper.particle(err);
                reject(reqDetails);
            }
        );
    });
};

var valueFunctionCall = function(reqDetails) {
    var particleDeviceId = reqDetails.deviceFunctionDetails.particleDeviceId;
    var particleToken = reqDetails.deviceFunctionDetails.particleToken;
    var functionName = reqDetails.deviceFunctionDetails.particleFunctionName;
    var callDetails = reqDetails.req.inputValueDetails;

    return new Promise(function (resolve, reject) {
        var fnPr = particle.callFunction({
            deviceId: particleDeviceId,
            name: functionName,
            argument: callDetails,
            auth: particleToken
        });
        fnPr.then(
            function (data) {
                reqDetails.particleFunctionCallDetails = data.body;
                resolve(reqDetails);
            },
            function (err) {
                reqDetails.errorDetails = errorHelper.particle(err);
                reject(reqDetails);
            }
        );
    });
};

module.exports = {
    valueFunctionCall: valueFunctionCall,
    getFunctionNamesByParticleTokenAndParticleDeviceId: getFunctionNamesByParticleTokenAndParticleDeviceId,
    binaryFunctionCall: binaryFunctionCall
};