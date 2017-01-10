var errorHelper    = require('../helpers/errorhelper');
var errorHelper    = require('../helpers/errorhelper');

var amendDetails = (function(detailType, reqDetails) {
    return function(results) {
        return new Promise(function (resolve) {
            var len = results.length;
            var details = [];
            for (var i = 0; i < len; i++) {
                details.push(results[i].get());
            }
            reqDetails[detailType] = details;
            resolve(reqDetails);
        })
    };
});

var getOneDetail = (function(detailType, reqDetails) {
  return (function(results) {
    return new Promise(function (resolve, reject) {
      if (results) {
        reqDetails[detailType] = results.get();
        resolve(reqDetails);
      }
      else {
        reqDetails.errorDetails = errorHelper.unauthorizedRequest(results);
        reject(reqDetails);
      }
    })
  });
});

var verifyDetails = (function(detailType, reqDetails) {
    return (function(results) {
        return new Promise(function (resolve, reject) {
            if (results) {
                reqDetails[detailType] = results.get();
                resolve(reqDetails);
            }
            else {
                reqDetails.errorDetails = errorHelper.unauthorizedRequest(results);
                reject(reqDetails);
            }
        })
    });
});

var updateDetails = (function(detailType, reqDetails) {
    return (function(results) {
        return new Promise(function (resolve) {
            if (results) {
                reqDetails[detailType] = results.dataValues;
                resolve(reqDetails);
            }
            else {
                reqDetails.errorDetails = errorHelper.database(results);
                reject(reqDetails);
            }
        })
    });
});

var keyFunctionAssignment = (function(results) {
  tsHelper.logGreen(results);
    return new Promise(function (resolve) {
      if (results) {
        resolve(results);
      }
      else {
        reqDetails.errorDetails = errorHelper.database(results);
        reject(reqDetails);
      }
    });
});

var insertDetails = (function(detailType, reqDetails) {
    return (function(results) {
        return new Promise(function (resolve) {
            if (results) {
                reqDetails[detailType] = results.get();
                resolve(reqDetails);
            }
            else {
                reqDetails.errorDetails = errorHelper.database(results);
                reject(reqDetails);
            }
        })
    });
});

var passThruDetails = (function(reqDetails) {
    return (function(results) {
        return new Promise(function (resolve) {
            if (results) {
                resolve(reqDetails);
            }
            else {
                reqDetails.errorDetails = errorHelper.database(results);
                reject(reqDetails);
            }
        })
    });
});

var databaseError = (function(results) {
    var errorDetails = errorHelper.database(results);
    return new Promise(function (resolve, reject) {
        reject(errorDetails);
    });
});

var getPublicFunctionId = (function(details) {
  return(details[0].deviceFunctionId);
});

module.exports = {
    amendDetails: amendDetails,
  getOneDetail: getOneDetail,
    verifyDetails: verifyDetails,
    updateDetails: updateDetails,
    insertDetails: insertDetails,
    passThruDetails: passThruDetails,
  keyFunctionAssignment: keyFunctionAssignment,
  databaseError: databaseError,
  getPublicFunctionId: getPublicFunctionId
};