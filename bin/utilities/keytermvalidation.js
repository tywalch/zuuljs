var Promise = require('bluebird');
var dateTimeUtil = require('./datetimeutil');
var keyDB = require('../../lib/models/keydb');

function verifyValidTime(keyDetails) {
    return new Promise(function (resolve, reject) {
        var timeStart = keyDetails.accessTimeStart;
        var timeEnd = keyDetails.accessTimeEnd;
        var currentTime = keyDetails.dateTimeDetails.time;
        if (timeStart > timeEnd) {
            if (currentTime > timeStart && currentTime > timeEnd) resolve(keyDetails);
            else if (currentTime < timeStart && currentTime < timeEnd) resolve(keyDetails);
        }
        if (currentTime > timeStart && currentTime < timeEnd) resolve(keyDetails);
        else reject(keyDetails);
    });
}

function verifyValidDate(keyTerms) {
    return new Promise(function (resolve, reject) {
        var dateStart = keyTerms.accessActivationDate;
        var dateEnd = keyTerms.accessExpirationDate;
        var currentDateTime = keyTerms.dateTimeDetails.dateTime;

        if (currentDateTime > dateStart && currentDateTime < dateEnd) resolve(keyTerms);
        else reject(keyTerms);
    });
}

var verifyKeyTerms = (function verifyKeyTerms(reqDetails) {
    return new Promise(function (resolve, reject) {
        var termSuccess = (function(keyTerms) {
            resolve(reqDetails);
        });

        var termFailure = (function(keyTerms) {
            if (reqDetails.expired === true) reject(reqDetails);
            else {
                reqDetails.keyDetails.keySleep = true;
                reqDetails.keySleep = true;
                reject(reqDetails)
            }
        });

        if (!reqDetails.keyTermDetails) termFailure();
        else if (reqDetails.keyTermDetails.remainingCalls < 1) {
            if (reqDetails.keyTermDetails.accessTimeStart === '00:00:00' && reqDetails.keyTermDetails.accessTimeEnd === '23:59:59') {
                reqDetails.expired = true;
            }
            keyDB.deactivateKey(reqDetails)
              .then(termFailure)
              .catch(termFailure);
        }
        else {
            var keyTerms = {
                accessActivationDate: reqDetails.keyTermDetails.accessActivationDate,
                accessExpirationDate: reqDetails.keyTermDetails.accessExpirationDate,
                accessFrequency: reqDetails.keyTermDetails.accessFrequency,
                accessFrequencyUnits: reqDetails.keyTermDetails.accessFrequencyUnits,
                accessTimeStart: reqDetails.keyTermDetails.accessTimeStart,
                accessTimeEnd: reqDetails.keyTermDetails.accessTimeEnd,
                keyTimeZone: reqDetails.keyTermDetails.keyTimeZone,
                remainingCalls: reqDetails.keyTermDetails.remainingCalls
            };
            keyTerms.dateTimeDetails = dateTimeUtil.getTimeAndDateByTimeZone(keyTerms.keyTimeZone);


            verifyValidTime(keyTerms)
              .then(verifyValidDate)
              .then(termSuccess)
              .catch(termFailure);
        }
    });
});

module.exports = {
    verifyKeyTerms: verifyKeyTerms
};
