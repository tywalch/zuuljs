var timeZoneDefinitions = require('../../definitions/timezones');
var keyDB = require('../../../lib/models/keydb');
var keyTermValidation = require('../../utilities/keytermvalidation');
var dateTimeUtil = require('../../utilities/datetimeutil');

var getNewKeyFormDetails = (function(reqDetails) {
  return new Promise(function (resolve) {
    var formDetails = {
      keyTimeZone: timeZoneDefinitions.timezoneUSPreference
    };
    reqDetails.formDetails = formDetails;
    resolve(reqDetails);
  });
});

var selectTimezone = (function(reqDetails) {
  return new Promise(function (resolve) {
    var keyTimeZone = timeZoneDefinitions.timezoneUSPreferenceObj;
    var len = 421; // number of timezones, can't imagine this would change...
    for (var i = 0; i < len; i++) {
      if (keyTimeZone[i].timezone == reqDetails.keyDetails.keyTimeZone) {
        keyTimeZone[i].selected = 'selected';
        break;
      }
    }
    reqDetails.keyTimeZone = keyTimeZone;
    resolve(reqDetails);
  });
});

var getEditFormDetails = (function(reqDetails) {
  return new Promise(function (resolve) {
    reqDetails.editKeyDetails = {};
    if (reqDetails.keyDetails.accessExpirationDate !== '0000-00-00') reqDetails.editKeyDetails.accessExpirationDate = reqDetails.keyDetails.accessExpirationDate;
    if (reqDetails.keyDetails.accessActivationDate !== '0000-00-00') reqDetails.editKeyDetails.accessActivationDate = reqDetails.keyDetails.accessActivationDate;
    if (reqDetails.keyDetails.accessTimeStart !== '00:00:00') reqDetails.editKeyDetails.accessTimeStart = reqDetails.keyDetails.accessTimeStart;
    if (reqDetails.keyDetails.accessTimeEnd !== '00:00:00') reqDetails.editKeyDetails.accessTimeEnd = reqDetails.keyDetails.accessTimeEnd;
    //if (reqDetails.keyDetails.accessFrequency !== '2089-07-01') reqDetails.editKeyDetails.accessFrequency = reqDetails.keyDetails.accessFrequency;
    /*
     reqDetails.editKeyDetails.accessExpirationDate = dateTimeUtil.dateDisplayFormat(reqDetails.keyDetails.accessExpirationDate);
     reqDetails.editKeyDetails.accessActivationDate = dateTimeUtil.dateDisplayFormat(reqDetails.keyDetails.accessActivationDate);
     reqDetails.editKeyDetails.accessTimeStart = dateTimeUtil.timeDisplayFormat(reqDetails.keyDetails.accessTimeStart);
     reqDetails.editKeyDetails.accessTimeEnd = dateTimeUtil.timeDisplayFormat(reqDetails.keyDetails.accessTimeEnd);
     reqDetails.editKeyDetails.accessFrequency = parseInt(reqDetails.keyDetails.accessFrequency);
     */
    resolve(reqDetails);
  });
});

var keyExpirationFormat = (function(reqDetails) {
  return new Promise(function (resolve) {
    var len = Object.keys(reqDetails.keyDetails).length;
    for (var i = 0; i < len; i++) {
      if (!reqDetails.keyDetails[i].accessExpirationDate) reqDetails.keyDetails[i].accessExpirationDate = 'Never';
    }
    resolve(reqDetails);
  });
});

var keyTermCheck = (function (reqDetails) {
  return new Promise(function (resolve, reject) {
    reqDetails.keyStatus = reqDetails.keyDetails.keyStatus;
    if (reqDetails.keyDetails.keyStatus !== 'Active') reject(reqDetails); //TODO: use key definition instead of string for Active
    resolve(reqDetails);
  });
});

var keyTermRouter = (function(reqDetails) {
  return new Promise(function (resolve, reject) {
    //console.log('keyhelper 70', reqDetails);
    if (reqDetails.user.userId === reqDetails.keyDetails.deviceCreatorId || reqDetails.user.userId === reqDetails.keyDetails.deviceUserId) resolve(reqDetails);
    if (!reqDetails.keyDetails) reqDetails.keyDetails = reqDetails.deviceFunctionDetails;
    return keyDB.getKeyTermsByUserAndPublicKeyId(reqDetails)
      .then(function (reqDetails) {
        reqDetails.keyStatus = reqDetails.keyTermDetails.keyStatus;
        if (reqDetails.keyTermDetails.keyStatus !== 'Active') reject(reqDetails); //TODO: use key definition instead of string for Active
        resolve(reqDetails);
      })
      .catch(function (reqDetails) {
        reject(reqDetails);
      });
  });
});

var extractKeyTerms = (function(reqDetails) {
  return new Promise(function (resolve) {
    reqDetails.keyTermDetails = reqDetails.keyDetails;
    resolve(reqDetails);
  });
});

var convertDeviceDetails = (function(reqDetails) {
  return new Promise(function (resolve) {
    reqDetails.keyDetails = reqDetails.deviceDetails;
    resolve(reqDetails);
  });
});

var identifyUnusedKeys = (function(reqDetails) {
  return new Promise(function (resolve) {
    var len = reqDetails.keyDetails.length;
    if (len) {
      for (var i = 0; i < len; i++) {
        if (!reqDetails.keyDetails[i].keyUserId) {
          reqDetails.unusedKeys = true;
          continue;
        }
        if (reqDetails.unusedKeys && reqDetails.keyDetails[i].keyUserId) {
          reqDetails.usedKeys = true;
          break;
        }
      }
    }
    resolve(reqDetails);
  });
});

var prepareKeyTermsForDisplay = (function(reqDetails) {
  return new Promise(function (resolve) {
    reqDetails.termDetails = {};
    if (reqDetails.keyDetails.accessTimeStart !== '00:00:00' && reqDetails.keyDetails.accessTimeEnd !== '00:00:00') reqDetails.termDetails.accessTimeTerm = true;
    if (reqDetails.keyDetails.accessFrequency != '0') reqDetails.termDetails.accessFrequnecyTerm = true;
    if (reqDetails.keyDetails.accessExpirationDate !== 'Never') {
      reqDetails.termDetails.accessExpirationTerm = true;
    }
    resolve(reqDetails);
  });
});

module.exports= {
  getNewKeyFormDetails: getNewKeyFormDetails,
  //keyTermFormInterpreter: keyTermFormInterpreter,
  keyExpirationFormat: keyExpirationFormat,
  keyTermRouter: keyTermRouter,
  keyTermCheck: keyTermCheck,
  extractKeyTerms: extractKeyTerms,
  identifyUnusedKeys: identifyUnusedKeys,
  selectTimezone: selectTimezone,
  getEditFormDetails: getEditFormDetails,
  prepareKeyTermsForDisplay: prepareKeyTermsForDisplay,
  convertDeviceDetails: convertDeviceDetails
};
