var particleDevice   = require('../../interfaces/particle/particledevice');

var verifyChangedParticleDeviceFunction = (function(reqDetails) {
  if (reqDetails.deviceFunctionDetails.particleFunctionName === reqDetails.req.particleFunctionName && reqDetails.deviceFunctionDetails.particleFunctionVariable === reqDetails.req.particleFunctionVariable) {
    return new Promise(function (resolve) {
      resolve(reqDetails);
    });
  } else {
    return particleDevice.getDeviceDetailsByParticleTokenAndParticleDeviceId(reqDetails)
  }
});

module.exports = {
  verifyChangedParticleDeviceFunction: verifyChangedParticleDeviceFunction
};