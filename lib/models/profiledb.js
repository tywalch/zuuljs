var zuuldb = require('../../config/database').zuuldb;
var dbUtil = require('../../bin/utilities/databaseutil');

var verifyUserDetailsByUser = (function(reqDetails) {
  console.log('verifyUserDetailsByUser');
  var details = {
    userId: reqDetails.user.userId
  };
  var verifyUserDetailsByUser = dbUtil.verifyDetails('userDetails',reqDetails);
  return zuuldb.vUserDetails.scope({ method: ['byUser', details]})
    .findOne({})
    .then(verifyUserDetailsByUser)
    .catch(dbUtil.databaseError)
});

var editProfile = function(reqDetails) {
  console.log('editProfile');
  var editProfileDetails  = reqDetails.req;
  var passThruReqDetails = dbUtil.passThruDetails(reqDetails);
  return zuuldb.user.update(editProfileDetails, {where: {userId: reqDetails.user.userId}})
    .then(passThruReqDetails)
    .catch(dbUtil.databaseError)
};

var editParticleToken = function(reqDetails) {
  console.log('editProfile');
  var editParticleTokenDetails = {
    particleToken: reqDetails.particleToken
  }
  var passThruReqDetails = dbUtil.passThruDetails(reqDetails);
  return zuuldb.user.update(editParticleTokenDetails, {where: {userId: reqDetails.user.userId}})
    .then(passThruReqDetails)
    .catch(dbUtil.databaseError)
};

module.exports = {
  verifyUserDetailsByUser: verifyUserDetailsByUser,
  editProfile: editProfile,
  editParticleToken: editParticleToken
};
