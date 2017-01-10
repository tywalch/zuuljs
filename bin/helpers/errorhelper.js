var errorStack = require('../utilities/errorstackdetails');
var errorDefinitions = require('../definitions/errordefinitions');
var tsHelper = require('./controllerhelpers/tshelper');

var database = (function(err) {
    var errorDetails = errorDefinitions.database;
    errorDetails.error = err;
    errorDetails.errorStackDetails = errorStack.getErrorStackDetails();
    tsHelper.logGreen(errorDetails);
    return errorDetails;
});

var particle = (function(err) {
    var errorDetails = errorDefinitions.particle;
    errorDetails.error = err;
    errorDetails.errorStackDetails = errorStack.getErrorStackDetails();

    return errorDetails;
});

var unauthorizedRequest = (function(displayMessage) {
    var errorDetails = errorDefinitions.unauthorizedRequest;
    if (displayMessage) errorDetails.displayMessage = displayMessage;
    errorDetails.errorStackDetails = errorStack.getErrorStackDetails();

    return errorDetails;
});

var invalidRequest = (function(err, displayMessage){
    var errorDetails = errorDefinitions.invalidRequest;
    if (err) {
        errorDetails.error = err;
        if (displayMessage) errorDetails.displayMessage = displayMessage;
    }
    errorDetails.errorStackDetails = errorStack.getErrorStackDetails();

    return errorDetails;
});

var testRequest = function(err, displayMessage){
    var errorDetails = errorDefinitions.invalidRequest;
    if (err) {
        errorDetails.error = err;
        if (displayMessage) errorDetails.displayMessage = displayMessage;
    }
    errorDetails.errorStackDetails = errorStack.getErrorStackDetails();
    return errorDetails;
};

module.exports = {
    database: database,
    particle: particle,
    invalidRequest: invalidRequest,
    unauthorizedRequest: unauthorizedRequest,
    testRequest: testRequest
};

