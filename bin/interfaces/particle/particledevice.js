var Particle         = require('particle-api-js');
var Promise          = require('bluebird');
var dataVerification = require('../../utilities/datavalidation');
var errorHelper = require('../../helpers/errorhelper');
var particle         = new Particle();

var getDevicesByParticleToken = function(reqDetails) {
    return new Promise(function (resolve, reject) {
        var devicesPr = particle.listDevices({auth: reqDetails.user.particleToken});

        var listDevices = function(devices) {
            var particleDevices = [];

            for (var i = 0; i < devices.body.length; i = i + 1) {
                var singleDevice = devices.body[i];
                var deviceAndNameObject = {};

                for (var device in singleDevice) {
                    if (!singleDevice.hasOwnProperty(device)) continue;
                    var value = singleDevice[device];
                    var obj = [device][0];
                    deviceAndNameObject[obj] = value;
                }
                particleDevices.push(deviceAndNameObject);
            }

            if (particleDevices.length === 0) {
                var err = 'No devices found with particleToken' + reqDetails.user.particleToken;
                var displayError = 'No devices found with particleToken';
                reqDetails.errorDetails = errorHelper.invalidRequest(err, displayError);

                reject(reqDetails);
            } else {
                reqDetails.particleDeviceDetails = particleDevices;
                resolve(reqDetails);
            }
        };

        var particleError = function(err) {
            reqDetails.errorDetails = errorHelper.particle(err);
            reject(reqDetails);
        };

        devicesPr
            .then(listDevices,particleError);
    });
};

var verifyParticleToken = function(reqDetails) {
    return new Promise(function (resolve, reject) {
        var devicesPr = particle.listDevices({auth: reqDetails.particleToken});

        var listDevices = function(devices) {
            if (!devices) {
                var err = 'No devices found with particleToken' + reqDetails.user.particleToken;
                var displayError = 'No devices found with particleToken';
                reqDetails.errorDetails = errorHelper.invalidRequest(err, displayError);
                reject(reqDetails);
            } else {
                reqDetails.particleDeviceDetails = devices;
                resolve(reqDetails);
            }
        };

        var particleError = function(err) {
            reqDetails.errorDetails = errorHelper.particle(err);
            reject(reqDetails);
        };

        devicesPr
            .then(listDevices,particleError);
    });
};


var verifyParticleDeviceIdByParticleTokenAndParticleDeviceId = function(reqDetails){
    var particleDeviceId = reqDetails.req.particleDeviceId;
    var particleToken = reqDetails.user.particleToken;

    return new Promise(function (resolve, reject) {
        var devicesPr = particle.listDevices({auth: particleToken});

        var verifyDeviceAuthorization = function(devices) {
            var deviceId = null;

            for (var i = 0; i < devices.body.length; i = i + 1) {
                var singleDevice = devices.body[i];

                if (dataVerification.nameMatch(singleDevice.id, particleDeviceId)) {
                    deviceId = singleDevice.id
                }
            }

            if (deviceId === "") {
                reqDetails.errorDetails = errorHelper.unauthorizedRequest();
                reject(reqDetails);
            } else {
                resolve(reqDetails);
            }
        };

        var particleError = function (err) {
            reqDetails.errorDetails = errorHelper.particle(err);
            reject(reqDetails);
        };

        devicesPr
            .then(verifyDeviceAuthorization, particleError);
    });
};

var getDeviceDetailsFromDeviceFunctionDetails = function(reqDetails){
    var particleDeviceId = reqDetails.deviceFunctionDetails.particleDeviceId;
    var particleToken = reqDetails.deviceFunctionDetails.particleToken;

    return new Promise(function (resolve, reject) {
        var devicesPr = particle.getDevice({auth: particleToken, deviceId: particleDeviceId});
        devicesPr.then(
            function (data) {
                reqDetails.particleDeviceDetails = data.body;
                resolve(reqDetails);
            },
            function (err) {
                reqDetails.errorDetails = errorHelper.particle(err);
                reject(reqDetails);
            }
        );
    });
};

var getDeviceDetailsByParticleTokenAndParticleDeviceId = function(reqDetails){
    var particleDeviceId = reqDetails.deviceDetails.particleDeviceId;
    var particleToken = reqDetails.deviceDetails.particleToken;

    return new Promise(function (resolve, reject) {
        var devicesPr = particle.getDevice({auth: particleToken, deviceId: particleDeviceId});
        devicesPr.then(
            function (data) {
                reqDetails.particleDeviceDetails = data.body;
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
    getDevicesByParticleToken: getDevicesByParticleToken,
    verifyParticleDeviceIdByParticleTokenAndParticleDeviceId: verifyParticleDeviceIdByParticleTokenAndParticleDeviceId,
    getDeviceDetailsByParticleTokenAndParticleDeviceId: getDeviceDetailsByParticleTokenAndParticleDeviceId,
    getDeviceDetailsFromDeviceFunctionDetails: getDeviceDetailsFromDeviceFunctionDetails,
    verifyParticleToken: verifyParticleToken
};