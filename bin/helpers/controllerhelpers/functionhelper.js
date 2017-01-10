var functionDB = require('../../../lib/models/functiondb');
var functionDefinitions = require('../../definitions/functiondefinitions');
var moment = require('moment-timezone');
var dataValidation = require('../../utilities/datavalidation')

var functionDetailsByUserStatus = (function(reqDetails) {
    if (reqDetails.deviceCreator || reqDetails.deviceOwner) {
        return functionDB.getDeviceFunctionDetailsByOwnerAndPublicDeviceId(reqDetails);
    }
    return functionDB.getDeviceFunctionDetailsByUserAndPublicDeviceId(reqDetails);
});
/*
 var verifyFunctionCallByDeviceOrKey = (function(reqDetails) {
 if (reqDetails.req.publicKeyId) {
 return functionDB.getDeviceFunctionDetailsByOwnerAndPublicDeviceId(reqDetails);
 }
 return functionDB.getDeviceFunctionDetailsByUserAndPublicDeviceId(reqDetails);
 });
 */
var parseFunctionAndVariableData = (function(reqDetails) {
    return new Promise(function (resolve) {
        reqDetails.particleFunctionDetails = reqDetails.particleDeviceDetails.functions;
        if (reqDetails.deviceFunctionDetails) {
            var particleFunctionName = reqDetails.deviceFunctionDetails.particleFunctionName;
            var functionLen = reqDetails.particleFunctionDetails.length;

            for (var i = 0; i < functionLen; i++) {
                if (reqDetails.particleFunctionDetails[i] === particleFunctionName) {
                    reqDetails.particleFunctionDetails.splice(i, 1);
                    break;
                }
            }
        }

        var particleVariables = reqDetails.particleDeviceDetails.variables;
        reqDetails.particleVariableDetails = [];

        for (var variable in particleVariables) {
            if (!particleVariables.hasOwnProperty(variable)) continue;
            if (reqDetails.deviceFunctionDetails && variable === reqDetails.deviceFunctionDetails.particleFunctionVariable) continue;
            var obj = [variable][0]; //key
            reqDetails.particleVariableDetails.push(obj);
        }
        resolve(reqDetails);
    });
});

var getFunctionControlDetails = (function(reqDetails) {
    return new Promise(function (resolve) {
        var functionDetails = reqDetails.deviceFunctionDetails;
        var len = functionDetails.length;
        for (var i = 0; i < len; i++) {
            var functionControlType = functionDetails[i].functionDataType;
            reqDetails.deviceFunctionDetails[i][functionControlType] = true;
        }
        resolve(reqDetails);
    });
});

var functionNameReconciliation = (function(reqDetails) {
    return new Promise(function (resolve) {
        if (reqDetails.req.functionName === "") {
            reqDetails.req.functionName = reqDetails.req.particleFunctionName;
        }
        resolve(reqDetails);
    });
});

var getNewFunctionFormDetails = (function(reqDetails) {
    return new Promise(function (resolve) {
        reqDetails.formDetails = formDetails;
        resolve(reqDetails);

        var formDetails = {
            functionType: functionDefinitions.functionType
        };
        reqDetails.formDetails = formDetails;
        resolve(reqDetails);
    });
});

var verifyFunctionCallValue = (function(reqDetails) {
    return new Promise(function (resolve, reject) {
        var numericFunction = (reqDetails.req.functionType === 'numeric');
        if (numericFunction) {
            if (dataValidation.verifyNumber(reqDetails.req.inputValueDetails)) {
                resolve(reqDetails);
            } else {
                reject(reqDetails);
            }
        }
        resolve(reqDetails)
    });
});

var selectFunctionFormDetails = (function(reqDetails) {
    return new Promise(function (resolve) {
        var i = functionDefinitions.functionType.length -1;
        do {
            if (reqDetails.deviceFunctionDetails.functionDataType === functionDefinitions.functionType[i].saveName) {
                functionDefinitions.functionType[i].selected = 'selected';
            }
        } while (i--);

        resolve(reqDetails);
    });
});

var selectFunctionsForEditKey = (function(reqDetails) {
    return new Promise(function (resolve) {
        if (reqDetails.keyFunctionDetails) {
            var lenKeyFunctions = reqDetails.keyFunctionDetails.length;
            var lenAllFunctions = reqDetails.deviceFunctionDetails.length;
            for (var j = 0; j < lenKeyFunctions; j++) {
                for (var i = 0; i < lenAllFunctions; i++) {
                    if (reqDetails.deviceFunctionDetails[i].deviceFunctionId === reqDetails.keyFunctionDetails[j].deviceFunctionId) {
                        reqDetails.deviceFunctionDetails[i].selected = 'selected';
                        break;
                    }
                }
            }
        }
        resolve(reqDetails);
    });
});

var extractKeyDetails = (function(reqDetails) {
    return new Promise(function (resolve) {
        reqDetails.keyDetails = reqDetails.deviceFunctionDetails;
        resolve(reqDetails);
    });
});

var extractDeviceDetails = (function(reqDetails) {
    return new Promise(function (resolve) {
        reqDetails.deviceDetails = reqDetails.deviceFunctionDetails;
        resolve(reqDetails);
    });
});

var prepareCallDetails = (function(reqDetails) {
    return new Promise(function (resolve) {

    });
});

module.exports= {
    functionDetailsByUserStatus: functionDetailsByUserStatus,
    parseFunctionAndVariableData: parseFunctionAndVariableData,
    functionNameReconciliation: functionNameReconciliation,
    getNewFunctionFormDetails: getNewFunctionFormDetails,
    getFunctionControlDetails: getFunctionControlDetails,
    extractKeyDetails: extractKeyDetails,
    extractDeviceDetails: extractDeviceDetails,
    selectFunctionFormDetails: selectFunctionFormDetails,
    selectFunctionsForEditKey: selectFunctionsForEditKey,
    prepareCallDetails: prepareCallDetails,
    verifyFunctionCallValue: verifyFunctionCallValue
};